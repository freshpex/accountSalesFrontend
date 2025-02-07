# 🛍️ AccountSales Platform

A modern, full-featured social media account marketplace built with React and ChakraUI.

![License](https://img.shields.io/badge/license-MIT-blue)
![Version](https://img.shields.io/badge/version-1.0.0-green)
![React](https://img.shields.io/badge/React-18.3.1-61dafb)
![ChakraUI](https://img.shields.io/badge/ChakraUI-2.10.4-319795)

## 🎥 Demo

### Desktop View
![Desktop Landing](./demo/desktopLanding.gif)
![Desktop Usage](./demo/desktopUsage.gif)

### Mobile View
<div align="center">
  <img src="./demo/mobileLanding.gif" alt="Mobile Landing" width="280px" />
  <img src="./demo/mobileUsage.gif" alt="Mobile Usage" width="280px" />
</div>

## ✨ Features

- 🔐 **Secure Authentication**

  - Email/Password login
  - Google OAuth integration
  - Two-factor authentication
  - Password recovery

- 💼 **Account Management**

  - Multi-platform account listings (Instagram, TikTok, etc.)
  - Detailed account metrics and analytics
  - Account verification system
  - Image galleries with lazy loading

- 💰 **Transactions & Payments**

  - Secure payment processing via Flutterwave
  - Escrow system for safe trades
  - Transaction history and receipts
  - Multiple currency support

- 👥 **User Dashboard**

  - Real-time analytics
  - Sales tracking
  - Customer management
  - Activity monitoring

- 🎨 **Modern UI/UX**
  - Responsive design
  - Dark/Light theme
  - Custom animations
  - Loading skeletons
  - Infinite scrolling

## 🚀 Getting Started

### Prerequisites

- Node.js 16.x or later
- npm or yarn
- A Flutterwave account for payments
- A Supabase account for storage

### Installation

1. Clone the repository:

```bash
git clone https://github.com/freshpex/accountSalesFrontend.git
cd accountsalesFrontend
```

2. Install dependencies:

```bash
npm install
```

3. Set up environment variables:

```bash
cp .env.example .env
```

4. Configure your environment variables:

```env
VITE_APP_API_URL=your_api_url
VITE_FLUTTERWAVE_PUBLIC_KEY=your_flutterwave_key
VITE_SUPABASE_ANON_KEY=your_supabase_key
// ... other variables
```

5. Start the development server:

```bash
npm run dev
```

## 🏗️ Architecture

```
src/
├── app/                    # Feature-based modules
│   ├── authentication/     # Auth-related components
│   ├── dashboard/         # Dashboard features
│   ├── product/          # Product management
│   └── ...
├── components/            # Shared components
├── context/              # React context providers
├── hooks/               # Custom hooks
├── layout/              # Layout components
├── pages/              # Page components
├── routes/             # Route configurations
├── services/           # API services
├── store/             # Redux store setup
├── utils/             # Utility functions
└── UI/                # UI components
```

## 🛠️ Tech Stack

- **Frontend Framework:** [React 18](https://react.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Saga](https://redux-saga.js.org/)
- **UI Framework:** [Chakra UI](https://chakra-ui.com/)
- **Routing:** [React Router v7](https://reactrouter.com/)
- **Forms:** [Formik](https://formik.org/) + [Yup](https://github.com/jquense/yup)
- **HTTP Client:** [Axios](https://axios-http.com/)
- **Charts:** [Recharts](https://recharts.org/)
- **Payment:** [Flutterwave](https://developer.flutterwave.com/)
- **Storage:** [Supabase](https://supabase.com/docs)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **Styling:** [Emotion](https://emotion.sh/) + [TailwindCSS](https://tailwindcss.com/)

## 📱 Features Breakdown

### Admin Dashboard

- Sales analytics
- Customer management
- Product listings
- Transaction monitoring
- User management

### User Dashboard

- Purchase history
- Account management
- Support tickets
- Profile settings
- Security settings

### Product Features

- Account listings
- Detailed metrics
- Image galleries
- Verification status
- Price history

## 🔒 Security Features

- JWT Authentication
- Role-based access control
- API request interceptors
- Secure payment processing
- Input validation
- XSS protection

## 🌐 API Integration

The platform integrates with multiple APIs:

- Backend REST API
- Flutterwave Payment API
- Supabase Storage API
- Google OAuth API

## 📈 Performance Optimizations

- Code splitting
- Lazy loading
- Image optimization
- Virtualized lists
- Memoized components
- Efficient Redux selectors

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👏 Acknowledgments

- Chakra UI Team
- Redux Team
- Flutterwave
- Supabase
- All contributors

## 📞 Support

For support, email epekipoluenoch@gmail.com or [Freshpex](https://github.com/freshpex).

---

Made with ❤️ by Your Freshpex

# Important Notice

⚠️ **RESTRICTED ACCESS REPOSITORY** ⚠️

This repository is provided for view-only access. The following actions are strictly prohibited without explicit written permission:

- Downloading the source code
- Copying any portion of the code
- Creating derivative works
- Commercial use
- Redistributing the code in any form

All code and content are protected under copyright law and the license terms. Violations will be pursued to the full extent of the law.

For permission requests, please contact: epekipoluenoch@gmail.com