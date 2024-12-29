export const transactionData = {
  stats: {
    all: 100,
    shipping: 25,
    completed: 45,
    cancelled: 30,
  },
  transactions: [
    {
      id: "021231",
      productImage: "/products/kanky-kitadakate-green.jpg",
      productName: "Kanky Kitadakate (Green)",
      customer: "Leslie Alexander",
      price: 21.78,
      date: "04/17/23",
      payment: "Paid",
      status: "Shipping"
    },
    {
      id: "021232",
      productImage: "/products/kanky-kitadakate-green.jpg",
      productName: "Kanky Kitadakate (Green)",
      customer: "Leslie Alexander",
      price: 21.78,
      date: "04/17/23",
      payment: "Unpaid",
      status: "Cancelled"
    },
    {
      id: "021233",
      productImage: "/products/story-honzo-cream.jpg",
      productName: "Story Honzo (Cream)",
      customer: "Leslie Alexander",
      price: 21.78,
      date: "04/17/23",
      payment: "Paid",
      status: "Shipping"
    },
    {
      id: "021234",
      productImage: "/products/beige-coffe-navy.jpg",
      productName: "Beige Coffe (Navy)",
      customer: "Leslie Alexander",
      price: 21.78,
      date: "04/17/23",
      payment: "Unpaid",
      status: "Cancelled"
    }
  ]
};

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
