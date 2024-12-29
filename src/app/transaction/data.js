export const transactionData = {
  stats: {
    all: 441,
    shipping: 100,
    completed: 300,
    cancelled: 41
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
  switch (status.toLowerCase()) {
    case 'shipping':
      return { bg: 'purple.100', color: 'purple.700' };
    case 'cancelled':
      return { bg: 'red.100', color: 'red.700' };
    default:
      return { bg: 'gray.100', color: 'gray.700' };
  }
};

export const getPaymentColor = (payment) => {
  switch (payment.toLowerCase()) {
    case 'paid':
      return { bg: 'green.100', color: 'green.700' };
    case 'unpaid':
      return { bg: 'orange.100', color: 'orange.700' };
    default:
      return { bg: 'gray.100', color: 'gray.700' };
  }
};
