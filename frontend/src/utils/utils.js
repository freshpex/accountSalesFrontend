export const getStatusColor = (status) => {
    const statusColors = {
      completed: { bg: 'green.100', color: 'green.800' },
      pending: { bg: 'orange.100', color: 'orange.800' },
      cancelled: { bg: 'red.100', color: 'red.800' },
      shipping: { bg: 'blue.100', color: 'blue.800' },
    };
    return statusColors[status.toLowerCase()] || { bg: 'gray.100', color: 'gray.800' };
  };
  
  export const getPaymentColor = (payment) => {
    const paymentColors = {
      paid: { bg: 'green.100', color: 'green.800' },
      unpaid: { bg: 'red.100', color: 'red.800' },
      pending: { bg: 'orange.100', color: 'orange.800' },
    };
    return paymentColors[payment.toLowerCase()] || { bg: 'gray.100', color: 'gray.800' };
  };

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
  