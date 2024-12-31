// Mock data structure that matches potential backend response
export const salesData = {
    summary: {
      currentTarget: 231032444,
      totalTarget: 500000000,
      totalRevenue: 81000,
      revenueGrowth: 16.5,
      totalCustomers: 5000,
      customerGrowth: 1.5,
      totalTransactions: 12000,
      transactionGrowth: 3.4,
      totalProducts: 5000,
      productGrowth: -1.5
    },
    
    monthlySales: [
      { month: 'Jan', itemValue: 180000, revenue: 210000 },
      { month: 'Feb', itemValue: 190000, revenue: 220000 },
      { month: 'Mar', itemValue: 185000, revenue: 215000 },
      { month: 'Apr', itemValue: 195000, revenue: 225000 },
      { month: 'May', itemValue: 200000, revenue: 230000 },
      { month: 'Jun', itemValue: 220000, revenue: 250000 },
      { month: 'Jul', itemValue: 210000, revenue: 240000 },
      { month: 'Aug', itemValue: 230000, revenue: 260000 },
      { month: 'Sep', itemValue: 225000, revenue: 255000 },
      { month: 'Oct', itemValue: 235000, revenue: 265000 },
      { month: 'Nov', itemValue: 240000, revenue: 270000 },
      { month: 'Dec', itemValue: 250000, revenue: 280000 }
    ],
  
    regionalData: [
      { region: 'East Java', growth: 50 },
      { region: 'Kalimantan', growth: 50 },
      { region: 'Bali', growth: 65 }
    ],
  
    popularProducts: [
      { 
        id: '021231',
        name: 'Kanky Kitadakate (Green)',
        price: 20.00,
        sales: 3000,
        status: 'Success',
        image: '/shoes/green-kanky.png'
      },
      {
        id: '021232',
        name: 'Story Honzo (Cream)',
        price: 20.00,
        sales: 2311,
        status: 'Success',
        image: '/shoes/cream-story.png'
      },
      {
        id: '021233',
        name: 'Beige Coffe (Navy)',
        price: 20.00,
        sales: 2111,
        status: 'Success',
        image: '/shoes/navy-beige.png'
      }
    ]
  };