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
      status: "Shipping",
      createdDate: "2023-04-17T10:30:00",
      updatedDate: "2023-04-17T10:30:00",
    },
    {
      id: "021232",
      productImage: "/products/kanky-kitadakate-green.jpg",
      productName: "Kanky Kitadakate (Green)",
      customer: "Leslie Alexander",
      price: 21.78,
      date: "04/17/23",
      payment: "Unpaid",
      status: "Cancelled",
      createdDate: "2023-04-17T11:45:00",
      updatedDate: "2023-04-17T11:45:00",
    },
    {
      id: "021233",
      productImage: "/products/story-honzo-cream.jpg",
      productName: "Story Honzo (Cream)",
      customer: "Leslie Alexander",
      price: 21.78,
      date: "04/17/23",
      payment: "Paid",
      status: "Shipping",
      createdDate: "2023-04-17T14:20:00",
      updatedDate: "2023-04-17T14:20:00",
    },
    {
      id: "021234",
      productImage: "/products/beige-coffe-navy.jpg",
      productName: "Beige Coffe (Navy)",
      customer: "Leslie Alexander",
      price: 21.78,
      date: "04/17/23",
      payment: "Unpaid",
      status: "Cancelled",
      createdDate: "2023-04-17T16:15:00",
      updatedDate: "2023-04-17T16:15:00",
    },
  ],
};

export const getStatusColor = (status) => {
  const statusColors = {
    completed: { bg: "green.100", color: "green.800" },
    pending: { bg: "orange.100", color: "orange.800" },
    cancelled: { bg: "red.100", color: "red.800" },
    shipping: { bg: "blue.100", color: "blue.800" },
  };
  return (
    statusColors[status.toLowerCase()] || { bg: "gray.100", color: "gray.800" }
  );
};

export const getPaymentColor = (payment) => {
  const paymentColors = {
    paid: { bg: "green.100", color: "green.800" },
    unpaid: { bg: "red.100", color: "red.800" },
    pending: { bg: "orange.100", color: "orange.800" },
  };
  return (
    paymentColors[payment.toLowerCase()] || {
      bg: "gray.100",
      color: "gray.800",
    }
  );
};
