export const isValidObjectId = (id) => {
  const objectIdPattern = /^[0-9a-fA-F]{24}$/;
  return objectIdPattern.test(id);
};

export const validateTransactionData = (data) => {
  const errors = {};
  
  if (!data.productId || !isValidObjectId(data.productId)) {
    errors.productId = 'Valid Product ID is required';
  }
  
  if (!data.amount || data.amount <= 0) {
    errors.amount = 'Valid amount is required';
  }
  
  if (!data.metadata?.customerName) {
    errors.customerName = 'Customer name is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateCustomer = (data) => {
  const errors = {};
  
  if (!data.name) errors.name = 'Name is required';
  if (!data.email) errors.email = 'Email is required';
  if (data.email && !/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateProfile = (data) => {
  const errors = {};

  if (!data.firstName?.trim()) {
    errors.firstName = 'First name is required';
  }

  if (!data.lastName?.trim()) {
    errors.lastName = 'Last name is required';
  }

  if (data.phoneNumber && !/^\+?[\d\s-]+$/.test(data.phoneNumber)) {
    errors.phoneNumber = 'Invalid phone number format';
  }

  if (data.birthDate) {
    const date = new Date(data.birthDate);
    const now = new Date();
    if (date > now) {
      errors.birthDate = 'Birth date cannot be in the future';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};
