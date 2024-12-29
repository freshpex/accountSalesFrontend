import {
  HiOutlineHome,
  HiOutlineShoppingCart,
  HiOutlineDocumentText,
  HiOutlineUsers,
  HiOutlineChartBar,
  HiOutlineCog,
  HiOutlineQuestionMarkCircle,
} from "react-icons/hi";

export const sidebarData = [
  {
    section: "General",
    items: [
      { title: "Dashboard", icon: HiOutlineHome, route: "/dashboard" },
      {
        title: "Product",
        icon: HiOutlineShoppingCart,
        route: "/product",
        subItems: [
          { name: "Sneakers", route: "/product/sneakers" },
          { name: "Jacket", route: "/product/jacket" },
          { name: "T-Shirt", route: "/product/t-shirt" },
          { name: "Bag", route: "/product/bag" },
        ],
      },
      { title: "Transaction", icon: HiOutlineDocumentText, route: "/transaction" },
      { title: "Customers", icon: HiOutlineUsers, route: "/customers" },
      { title: "Sales Report", icon: HiOutlineChartBar, route: "/sales-report" },
    ],
  },
  {
    section: "Tools",
    items: [
      { title: "Account & Settings", icon: HiOutlineCog, route: "/settings" },
      { title: "Help", icon: HiOutlineQuestionMarkCircle, route: "/help" },
    ],
  },
];

export const userData = {
  name: "Guy Hawkins",
  role: "Admin",
  avatar: "https://th.bing.com/th/id/OIP.LYJc5Mjvt8qrGGPxjmq2JAHaFj?w=263&h=197&c=7&r=0&o=5&dpr=1.2&pid=1.7",
};

export const company = {
  name: "Kanky Store",
  logo: "https://th.bing.com/th/id/OIP.NU9zscMHAn83CpLA9fDjrgHaHa?w=167&h=180&c=7&r=0&o=5&dpr=1.2&pid=1.7",
};
