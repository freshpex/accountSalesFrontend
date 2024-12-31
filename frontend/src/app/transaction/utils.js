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
