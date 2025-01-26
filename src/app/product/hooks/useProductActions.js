import { useDispatch } from 'react-redux';
import { validateImage, validateProductData } from '../redux/actions';
import { 
  add_product, 
  add_product_success,
  add_product_error,
  update_product, 
  update_product_success,
  update_product_error,
  delete_product,
  delete_product_success,
  delete_product_error,
  clear_product_error,
  reset_product_state 
} from '../redux/reducer';
import api from '../../../services/DataService';
import toast from 'react-hot-toast';

export const useProductActions = () => {
  const dispatch = useDispatch();

  const handleAddProduct = async (productData) => {
    try {
      const formData = new FormData();
      
      // Basic fields
      Object.entries(productData).forEach(([key, value]) => {
        if (key !== 'images') {
          formData.append(key, String(value));
        }
      });

      // Handle images
      if (Array.isArray(productData.images)) {
        productData.images.forEach(image => {
          if (image instanceof File) {
            const { isValid, error } = validateImage(image);
            if (!isValid) throw new Error(error);
            formData.append('images', image);
          }
        });
      }

      dispatch(add_product());
      const response = await api.post('/api/v1/products', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      dispatch(add_product_success(response.data));
      toast.success('Product added successfully');
      return true;
    } catch (error) {
      console.error('Add product error:', error);
      const errorMessage = error.response?.data?.error || error.message;
      dispatch(add_product_error(errorMessage));
      toast.error(errorMessage);
      return false;
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      const formData = new FormData();

      // Add basic fields
      Object.keys(productData).forEach(key => {
        if (key !== 'images' && key !== 'newImages' && key !== 'existingImages') {
          formData.append(key, productData[key]);
        }
      });

      // Handle existing images
      if (productData.existingImages?.length) {
        formData.append('existingImages', JSON.stringify(productData.existingImages));
      }

      // Handle new images
      if (productData.newImages?.length) {
        productData.newImages.forEach(image => {
          if (image instanceof File) {
            const { isValid, error } = validateImage(image);
            if (!isValid) throw new Error(error);
            formData.append('images', image);
          }
        });
      }

      dispatch(update_product());
      const response = await api.put(`/api/v1/products/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      dispatch(update_product_success(response.data));
      toast.success('Product updated successfully');
      return true;
    } catch (error) {
      console.error('Update error:', error);
      const errorMessage = error.response?.data?.error || error.message;
      dispatch(update_product_error(errorMessage));
      toast.error(errorMessage);
      return false;
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      dispatch(clear_product_error());
      dispatch(delete_product(id));
      const response = await fetch(`/api/v1/products/${id}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete product');

      dispatch(delete_product_success(id));
      toast.success('Product deleted successfully');
      return true;
    } catch (error) {
      toast.error(`Failed to delete product ${error.message}`);
      dispatch(delete_product_error(error.message));
      return false;
    }
  };

  const handleResetState = () => {
    dispatch(reset_product_state());
  };

  return {
    handleAddProduct,
    handleUpdateProduct,
    handleDeleteProduct,
    handleResetState
  };
};
