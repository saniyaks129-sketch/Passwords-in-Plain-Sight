# DevMarket Architecture Audit Report

## Audit Summary & Metrics
- **Total `fetch()` Calls Found:** 7 scattered calls
- **Hardcoded API URLs:** 7 instances of `https://fakestoreapi.com`
- **Manual Auth Token Retrieval:** 4 instances of `localStorage.getItem('auth_token')`

## Architectural Anti-Patterns Identified
1. **Lack of Single Source of Truth:** API endpoints were duplicated across pages (`ProductsPage`, `CartPage`, `ProfilePage`).
2. **Inconsistent Error Handling:** Errors were handled via alert boxes in some components, `console.error` in others, and swallowed silently elsewhere.
3. **Repeated Authentication Logic:** Token headers were manually created before every request.

## Centralized Solution Implemented
Created `src/services/api.js` utilizing Axios with:
- `import.meta.env.VITE_API_BASE_URL` for dynamic base URL.
- Request Interceptor attaching `Authorization: Bearer <token>`.
- Response Interceptor handling `401`, `403`, and `5xx` errors globally.

## Live Application URL
https://build-resilient-api-service-layer-v.vercel.app/