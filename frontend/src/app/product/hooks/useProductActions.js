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
      const { isValid, errors } = validateProductData(productData);
      if (!isValid) {
        Object.values(errors).forEach(error => toast.error(error));
        return false;
      }

      const formData = new FormData();

      // Add basic fields
      Object.keys(productData).forEach(key => {
        if (key !== 'images') {
          formData.append(key, productData[key]);
        }
      });

      // Handle images
      if (productData.images?.length) {
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
      console.error('Product addition error:', error);
      const errorMessage = error.response?.data?.error || error.message;
      toast.error(errorMessage);
      dispatch(add_product_error(errorMessage));
      return false;
    }
  };

  const handleUpdateProduct = async (id, productData) => {
    try {
      dispatch(clear_product_error());
      const { isValid, errors } = validateProductData(productData);

      if (!isValid) {
        Object.values(errors).forEach(error => toast.error(error));
        return false;
      }

      // Validate new images if present
      if (productData.newImages?.length) {
        for (const image of productData.newImages) {
          if (image instanceof File) {
            const { isValid, error } = validateImage(image);
            if (!isValid) {
              toast.error(error);
              return false;
            }
          }
        }
      }

      dispatch(update_product({ id, data: productData }));
      const response = await fetch(`/api/v1/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(productData),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) throw new Error('Failed to update product');

      const result = await response.json();
      dispatch(update_product_success(result));
      toast.success('Product updated successfully');
      return true;
    } catch (error) {
      toast.error(`Failed to update product ${error.message}`);
      dispatch(update_product_error(error.message));
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
