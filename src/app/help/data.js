export const helpData = {
  tickets: [
    {
      id: "TK-001",
      subject: "Payment Issue",
      message:
        "I'm having trouble processing my payment. The transaction keeps failing.",
      status: "open",
      priority: "high",
      createdAt: "2024-03-28 14:30",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "/avatars/john.jpg",
      },
      responses: [
        {
          id: 1,
          message:
            "We're looking into this issue. Could you please provide your transaction ID?",
          sender: "support",
          timestamp: "2024-03-28 15:00",
        },
      ],
    },
    {
      id: "TK-002",
      subject: "Account Access",
      message: "I can't log into my account after changing my password",
      status: "pending",
      priority: "medium",
      createdAt: "2024-03-27 09:15",
      customer: {
        name: "Sarah Wilson",
        email: "sarah@example.com",
        avatar: "/avatars/sarah.jpg",
      },
      responses: [],
    },
  ],
  notifications: [
    {
      id: 1,
      type: "ticket",
      message: "New support ticket from John Doe",
      timestamp: "2024-03-28 14:30",
      read: false,
    },
    {
      id: 2,
      type: "system",
      message: "System maintenance scheduled for tomorrow",
      timestamp: "2024-03-28 10:00",
      read: true,
    },
  ],
};

export const ticketPriorityColors = {
  high: { color: "red.500", bg: "red.50" },
  medium: { color: "orange.500", bg: "orange.50" },
  low: { color: "green.500", bg: "green.50" },
};

export const ticketStatusColors = {
  open: { color: "green.500", bg: "green.50" },
  pending: { color: "orange.500", bg: "orange.50" },
  closed: { color: "gray.500", bg: "gray.50" },
};
