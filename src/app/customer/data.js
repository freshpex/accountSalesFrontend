export const customerData = {
  summary: {
    totalCustomers: 5482,
    activeCustomers: 4271,
    newCustomers: 127,
    churnRate: 2.4,
    metrics: {
      daily: {
        acquisitions: 15,
        conversions: 8,
        churn: 3,
      },
      monthly: {
        acquisitions: 450,
        conversions: 225,
        churn: 85,
      },
    },
  },

  customerTrends: {
    monthly: [
      { month: "Jan", active: 4100, new: 380, churned: 65 },
      { month: "Feb", active: 4200, new: 365, churned: 72 },
      { month: "Mar", active: 4350, new: 420, churned: 58 },
      { month: "Apr", active: 4450, new: 385, churned: 82 },
      { month: "May", active: 4150, new: 325, churned: 95 },
      { month: "Jun", active: 4271, new: 450, churned: 85 },
    ],
  },

  demographics: {
    ageGroups: [
      { group: "18-24", count: 842, percentage: 15.4 },
      { group: "25-34", count: 1975, percentage: 36.0 },
      { group: "35-44", count: 1486, percentage: 27.1 },
      { group: "45-54", count: 724, percentage: 13.2 },
      { group: "55+", count: 455, percentage: 8.3 },
    ],
    regions: [
      { name: "East Java", customers: 2150, percentage: 39.2 },
      { name: "Kalimantan", customers: 1875, percentage: 34.2 },
      { name: "Bali", customers: 1457, percentage: 26.6 },
    ],
  },

  customerList: [
    {
      id: "CST001",
      name: "John Doe",
      email: "john.doe@email.com",
      phone: "+62 812-3456-7890",
      joinDate: "2023-12-15",
      totalOrders: 24,
      totalSpent: 1250.8,
      status: "active",
      lastPurchase: "2024-03-15",
      segment: "Gold",
      avatar: "/avatars/john.jpg",
    },
    {
      id: "CST002",
      name: "Sarah Smith",
      email: "sarah.smith@email.com",
      phone: "+62 812-2345-6789",
      joinDate: "2024-01-20",
      totalOrders: 8,
      totalSpent: 450.25,
      status: "active",
      lastPurchase: "2024-03-18",
      segment: "Silver",
      avatar: "/avatars/sarah.jpg",
    },
    {
      id: "CST003",
      name: "Michael Johnson",
      email: "michael.j@email.com",
      phone: "+62 812-3456-7891",
      joinDate: "2023-11-05",
      totalOrders: 35,
      totalSpent: 2100.6,
      status: "inactive",
      lastPurchase: "2024-02-28",
      segment: "Platinum",
      avatar: "/avatars/michael.jpg",
    },
  ],

  segments: [
    { name: "Platinum", count: 482, averageSpend: 2000, retentionRate: 95 },
    { name: "Gold", count: 1245, averageSpend: 1000, retentionRate: 85 },
    { name: "Silver", count: 2355, averageSpend: 500, retentionRate: 75 },
    { name: "Bronze", count: 1400, averageSpend: 250, retentionRate: 60 },
  ],

  recentActivity: [
    {
      id: 1,
      customerId: "CST001",
      type: "purchase",
      details: "Purchased 3 items",
      amount: 125.5,
      date: "2024-03-20T10:30:00",
    },
    {
      id: 2,
      customerId: "CST002",
      type: "support",
      details: "Raised support ticket #45892",
      date: "2024-03-20T09:15:00",
    },
    {
      id: 3,
      customerId: "CST003",
      type: "review",
      details: "Left a 5-star review",
      date: "2024-03-19T16:45:00",
    },
  ],
};
