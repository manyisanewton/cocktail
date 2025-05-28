# 🍹 Cocktail Explorer App

A modern React-based web app to browse, search, and shop cocktails — powered by [TheCocktailDB API](https://www.thecocktaildb.com/).

## ✨ Features

- **Joy of Cocktails**: Animated hero section with rotating featured cocktail and CTA.
- **Featured Carousel**: Swipeable list of 10 cocktails with navigation buttons.
- **Search Cocktails**: Debounced search input to find cocktails by name.
- **Pagination**: Browse cocktails in pages (8 per page).
- **Cart System**: Add items to a cart with visual and audio feedback.
- **Responsive Design**: Mobile-friendly and desktop-ready UI.
- **Slick Animations & Alerts**: Built using Framer Motion & SweetAlert2.

## 🛠 Tech Stack

- **React + Vite**
- **React Query** – Data fetching & caching
- **Framer Motion** – Smooth animations
- **SweetAlert2** – Alert notifications
- **React Router DOM** – Page routing
- **Lodash** – Debounce utility

## 📦 Installation

### Prerequisites

- Node.js v14+
- npm or yarn

### Setup

<!-- ```bash
git clone <repository-url>
cd cocktail-explorer
npm install
npm run dev -->


## 📁 Project Structure


cocktail-explorer/
├── public/
│   └── index.html
├── src/
│   ├── components/        # Reusable UI components
│   ├── context/           # CartContext with useCart hook
│   ├── pages/             # Home.jsx with main UI logic
│   ├── App.jsx            # Routes and providers
│   └── index.js           # React entry point
├── package.json
└── README.md
