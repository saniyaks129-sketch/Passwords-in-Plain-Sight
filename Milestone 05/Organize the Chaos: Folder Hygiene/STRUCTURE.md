# Project Structure & Folder Hygiene Architecture

## Onboarding Time Estimate
30–45 minutes

---

## Folder Placement Rules

1. **`src/components/`**
   - Place shared, domain-agnostic UI components used across two or more features here (e.g., `Button.jsx`, `Modal.jsx`, `Spinner.jsx`, `Card.jsx`).

2. **`src/features/`**
   - Place domain-specific feature modules here. Each feature directory encapsulates its own components, hooks, and services:
     - `src/features/auth/`: Authentication UI and services (`LoginForm.jsx`, `loginService.js`, `useLogin.js`).
     - `src/features/cart/`: Cart management UI and logic (`CartItem.jsx`, `CheckoutForm.jsx`, `cartService.js`, `useCart.js`).
     - `src/features/catalog/`: Product catalog UI and service calls (`ProductCard.jsx`, `ProductList.jsx`, `productsService.js`).
     - `src/features/orders/`: Order tracking and history (`ordersAPI.js`).

3. **`src/hooks/`**
   - Place generic, reusable custom React hooks here (e.g., `useDebounce.js`, `useLocalStorage.js`, `useWindowSize.js`).

4. **`src/utils/`**
   - Place pure JavaScript helper and utility functions here with zero React dependency (e.g., `formatCurrency.js`, `truncateText.js`, `parseDate.js`).

5. **`src/services/`**
   - Place base API clients, global network configurations, and shared service layers here (e.g., `apiClient.js`).

---

## Target Feature-Based Folder Tree

```text
src/
├── components/          # Shared UI components (used by 2+ features)
│   ├── Button.jsx
│   ├── Card.jsx
│   ├── Modal.jsx
│   └── Spinner.jsx
├── features/            # Feature domain modules
│   ├── auth/            # Authentication domain
│   │   ├── LoginForm.jsx
│   │   ├── loginService.js
│   │   └── useLogin.js
│   ├── cart/            # Shopping Cart domain
│   │   ├── CartItem.jsx
│   │   ├── CheckoutForm.jsx
│   │   ├── cartService.js
│   │   └── useCart.js
│   ├── catalog/         # Product Catalog domain
│   │   ├── ProductCard.jsx
│   │   ├── ProductList.jsx
│   │   └── productsService.js
│   └── orders/          # Order History domain
│       └── ordersAPI.js
├── hooks/               # Shared generic custom hooks
│   ├── useDebounce.js
│   ├── useLocalStorage.js
│   └── useWindowSize.js
├── services/            # Shared base API clients & config
│   └── apiClient.js
└── utils/               # Pure utility functions (zero React dependency)
    ├── formatCurrency.js
    ├── parseDate.js
    └── truncateText.js