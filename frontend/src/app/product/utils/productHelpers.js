export const validateProduct = (product) => {
  const errors = {};
  
  if (!product.username) errors.username = 'Username is required';
  if (!product.type) errors.type = 'Type is required';
  if (!product.price) errors.price = 'Price is required';
  if (!product.status) errors.status = 'Status is required';
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const formatProductData = (data) => {
  return {
    ...data,
    price: Number(data.price),
    follower: Number(data.follower),
    age: Number(data.age),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
};

export const getProductTypeColor = (type) => {
  const colors = {
    instagram: 'pink',
    facebook: 'blue',
    twitter: 'twitter',
    whatsapp: 'green'
  };
  return colors[type.toLowerCase()] || 'gray';
};
