export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];
export const MAX_IMAGE_SIZE = 8 * 1024 * 1024;

export const validateImage = (file) => {
  if (!file) return { isValid: false, error: 'No file provided' };
  
  if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
    return { 
      isValid: false, 
      error: 'Invalid file type. Only JPG, PNG and SVG files are allowed' 
    };
  }

  if (file.size > MAX_IMAGE_SIZE) {
    return { 
      isValid: false, 
      error: 'File size too large. Maximum size is 4MB' 
    };
  }

  return { isValid: true };
};

export const validateProductData = (data) => {
  const errors = {};
  
  if (!data.username?.trim()) errors.username = 'Username is required';
  if (!data.type) errors.type = 'Product type is required';
  if (!data.age) errors.age = 'Account age is required';
  if (!data.followers) errors.followers = 'Follower count is required';
  if (!data.price) errors.price = 'Price is required';
  if (!data.region?.trim()) errors.region = 'Region is required';
  if (!data.about?.trim()) errors.about = 'Description is required';

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
