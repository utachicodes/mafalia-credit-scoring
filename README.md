<div align="center">
  <img src="public/mafalia-logo.png" alt="Mafalia Logo" width="200"/>
  
  # Mafalia - Your Smart Finance
  
  ### AI-Powered Credit Scoring & Loan Management Platform for Senegal
  

  [![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38bdf8?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
  
  [Live Demo](https://mafalia-credit-scoring.vercel.app/) • [Documentation](#documentation) • [Report Bug](https://github.com/utachicodes/mafalia-credit-scoring-hk/issues) • [Request Feature](https://github.com/utachicodes/mafalia-credit-scoring-hk/issues)
</div>

---

## 🌟 Overview

**Mafalia Credit Scoring** is a cutting-edge AI-powered financial platform designed specifically for businesses in Senegal. It revolutionizes credit scoring and loan management by combining advanced artificial intelligence with real-time financial data analysis, Mobile Money integration, and transparent credit assessment.

### 🎯 Key Highlights

- **AI Credit Scoring**: Intelligent credit rating system (AAA to BB) based on comprehensive business metrics
- **Real-Time Analysis**: Instant financial health assessment with live data processing
- **Mobile Money Integration**: Seamless integration with M-Pesa, Orange Money, MTN, and Wave
- **Multi-Language Support**: Full English and French localization
- **Dark Mode**: Beautiful light and dark themes for comfortable viewing
- **3D Visualizations**: Engaging 3D graphics and smooth animations throughout

---

## ✨ Features

### 🏦 Credit Scoring Engine
- **Automated Credit Assessment**: AI-powered evaluation using 6 key categories
  - Revenue & Cash Flows (25%)
  - Margins & Profitability (15%)
  - Debt & Repayment History (15%)
  - Client Receivables (15%)
  - Inventory & Operations (15%)
  - Legal Data & Platform Usage (15%)
- **Credit Ratings**: AAA, AA, A, BBB, BB classifications
- **Loan Amount Calculation**: Automatic safe credit limit determination
- **Real-Time Updates**: Dynamic score recalculation on data changes

### 💰 Loan Management
- **Loan Applications**: Streamlined application process with instant estimates
- **Active Loan Tracking**: Monitor all loans with repayment progress
- **Loan Calculator**: Interactive calculator with FCFA currency support
- **Payment Schedules**: Detailed amortization tables
- **Auto-Approval**: AI-driven loan approval based on credit score

### 📊 Financial Analytics
- **Revenue Tracking**: Monthly and annual revenue analysis
- **Profit Margins**: Gross and net margin calculations
- **Cash Flow Analysis**: Inflow/outflow monitoring with charts
- **Loan Performance**: Track loan portfolio health
- **Export Reports**: Download financial reports in multiple formats

### 📱 Mobile Money Integration
- **Multi-Provider Support**: M-Pesa, Orange Money, MTN Mobile Money, Wave
- **Transaction History**: Complete transaction logs with search
- **Send Money**: Quick money transfers with fee calculation
- **Balance Tracking**: Real-time account balance monitoring
- **Flow Analysis**: Inflow/outflow ratio tracking for credit scoring

### 🧾 Client Receivables Management
- **Invoice Tracking**: Monitor all outstanding client payments
- **Aging Reports**: 0-30, 31-60, 61-90, 90+ days categorization
- **Payment Reminders**: Automated alerts for overdue payments
- **Doubtful Debt Tracking**: Identify and manage risky receivables
- **Quick Invoice Creation**: Fast invoice generation with payment terms

### 🎨 User Experience
- **3D FCFA Symbol**: Stunning 3D dollar sign animation on landing page
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Design**: Perfect on mobile, tablet, and desktop
- **Hover Effects**: Interactive hover states throughout
- **Gradient Accents**: Beautiful red gradients matching brand identity

---

## 🛠️ Tech Stack

### Frontend
- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Language**: [TypeScript 5.0](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS 4.0](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **3D Graphics**: [React Three Fiber](https://docs.pmnd.rs/react-three-fiber) + [Three.js](https://threejs.org/)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)

### State Management & Data
- **State**: React Hooks + Context API
- **Forms**: React Hook Form
- **Internationalization**: Custom i18n provider (EN/FR)
- **Theme**: Custom theme provider with dark mode

### Development Tools
- **Package Manager**: npm/yarn/pnpm
- **Linting**: ESLint
- **Formatting**: Prettier
- **Version Control**: Git + GitHub

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   \`\`\`bash
   git clone https://github.com/utachicodes/mafalia-credit-scoring-hk.git
   cd mafalia-credit-scoring-hk
   \`\`\`

2. **Install dependencies**
   \`\`\`bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   \`\`\`

3. **Run the development server**
   \`\`\`bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   \`\`\`

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

\`\`\`bash
npm run build
npm start
\`\`\`

---

## 📖 Documentation

### Credit Scoring Algorithm

The platform implements a sophisticated credit scoring system based on the following formula:

**Final Score** = Σ(Normalized Indicator × Weight)

**Adjusted Score** = Base Score × (1 - Doubtful Receivables / Revenue)

#### Rating Thresholds
| Score Range | Rating | Risk Level | Coefficient |
|-------------|--------|------------|-------------|
| 90-100%     | AAA    | Very Low   | 1.0         |
| 75-89%      | AA     | Low        | 0.8         |
| 60-74%      | A      | Moderate   | 0.6         |
| 45-59%      | BBB    | High       | 0.4         |
| <45%        | BB     | Very High  | 0.2         |

### Credit Amount Calculation

**Credit Amount** = Average Monthly Cash Flow × Score Coefficient × Repayment History Coefficient - Doubtful Receivables

#### Example Calculation
- Average Monthly Cash Flow: 1,000,000 FCFA
- Credit Rating: AA (Coefficient = 0.8)
- Repayment History: Occasional delays (0.9)
- Doubtful Receivables: 100,000 FCFA

**Result**: 1,000,000 × 0.8 × 0.9 - 100,000 = **620,000 FCFA**

---

## 🎨 Design System

### Color Palette
- **Primary**: Mafalia Red (#E31E24)
- **Background**: Black (#000000) / White (#FFFFFF)
- **Accents**: Red gradients and subtle grays
- **Success**: Green (#10B981)
- **Warning**: Amber (#F59E0B)
- **Error**: Red (#EF4444)

### Typography
- **Headings**: Geist Sans (Bold, Semibold)
- **Body**: Geist Sans (Regular, Medium)
- **Monospace**: Geist Mono

---

## 🌍 Localization

The platform supports full English and French localization:

\`\`\`typescript
// Example usage
const { t } = useLanguage()
<h1>{t('dashboard.title')}</h1>
\`\`\`

### Supported Languages
- 🇬🇧 English
- 🇫🇷 Français

---

## 📱 Pages & Routes

| Route | Description |
|-------|-------------|
| `/` | Landing page with 3D FCFA symbol |
| `/dashboard` | Main dashboard with credit score overview |
| `/loans` | Loan management and applications |
| `/analytics` | Financial analytics and reports |
| `/mobile-money` | Mobile Money integration hub |
| `/receivables` | Client receivables tracking |

---

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 Team

**Mafalia** - Your Smart Finance Partner

- **GitHub**: [@utachicodes](https://github.com/utachicodes)
- **Email**: abdoullahaljersi@gmail.com

---

  </p>
</div>
