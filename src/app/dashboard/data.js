export const dashboardData = {
  salesTarget: {
    current: 231032444,
    target: 500000000,
    percentage: 46.2,
    timeLeft: "145 days"
  },
  
  metrics: {
    revenue: {
      value: 81000,
      growth: 10.4,
      trend: "up",
      previousValue: 73371
    },
    customers: {
      value: 5000,
      growth: 1.5,
      trend: "up",
      newCustomers: 127
    },
    transactions: {
      value: 12000,
      growth: 3.6,
      trend: "up",
      avgTicketSize: 81.5
    },
    products: {
      value: 5000,
      growth: -1.5,
      trend: "down",
      outOfStock: 23
    }
  },

  salesTrends: {
    weekly: [
      { day: 'Mon', sales: 12400 },
      { day: 'Tue', sales: 15800 },
      { day: 'Wed', sales: 14200 },
      { day: 'Thu', sales: 16800 },
      { day: 'Fri', sales: 18900 },
      { day: 'Sat', sales: 17800 },
      { day: 'Sun', sales: 13200 }
    ],
    monthly: [
      { month: 'Jan', value: 211411223, target: 339091888 },
      { month: 'Feb', value: 225482254, target: 342091888 },
      { month: 'Mar', value: 218457125, target: 345091888 },
      { month: 'Apr', value: 232125447, target: 348091888 },
      { month: 'May', value: 245784558, target: 351091888 },
      { month: 'Jun', value: 258745124, target: 354091888 }
    ]
  },

  customerGrowth: [
    { region: 'East Java', percentage: 50, total: 12500, new: 450 },
    { region: 'Kalimantan', percentage: 50, total: 11800, new: 380 },
    { region: 'Bali', percentage: 65, total: 15200, new: 520 }
  ],

  productPopular: [
    {
      id: 1,
      name: 'Kanky Kitadakate (Green)',
      price: 20.00,
      sales: 3000,
      status: 'Success',
      inventory: 1250,
      rating: 4.8,
      image: '/shoes/green.png'
    },
    {
      id: 2,
      name: 'Story Honzo (Cream)',
      price: 20.00,
      sales: 2311,
      status: 'Success',
      inventory: 850,
      rating: 4.6,
      image: '/shoes/cream.png'
    },
    {
      id: 3,
      name: 'Beige Coffe (Navy)',
      price: 20.00,
      sales: 2111,
      status: 'Success',
      inventory: 650,
      rating: 4.7,
      image: '/shoes/navy.png'
    }
  ],

  recentActivities: [
    {
      id: 1,
      type: 'order',
      message: 'New order received from John Doe',
      time: '5 minutes ago',
      amount: 125.50
    },
    {
      id: 2,
      type: 'inventory',
      message: 'Low stock alert: Kanky Kitadakate (Green)',
      time: '15 minutes ago'
    },
    {
      id: 3,
      type: 'customer',
      message: 'New customer registration: Sarah Smith',
      time: '1 hour ago'
    }
  ]
};