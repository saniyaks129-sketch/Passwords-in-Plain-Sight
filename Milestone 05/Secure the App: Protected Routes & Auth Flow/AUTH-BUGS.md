# Auth Bug Analysis — VaultApp

## Move 1: Observed Behaviours
- Navigating directly to `/dashboard` in Incognito mode without logging in renders the private Dashboard component instead of redirecting to `/login`.
- Navigating to `/settings` without logging in also renders the settings page without authentication.
- Logging in and refreshing the page resets state and logs the user out immediately.
- Tokens and user objects are not restored from `localStorage` on page reload.
- Navbar shows static links and does not dynamically toggle between Login and Logout states.

## Root Cause Analysis
- **Bug 1 (No Route Protection):** Private routes in `App.jsx` are missing a `ProtectedRoute` wrapper component to block unauthenticated access.
- **Bug 2 (Token Persistence):** `AuthContext.jsx` lacks a `useEffect` hook to synchronize state with `localStorage` on mount.
- **Bug 3 (Context Wiring):** `AuthProvider` is either missing or incorrectly wrapping components in `main.jsx`.
- **Bug 4 (Navbar Responsiveness):** `Navbar.jsx` does not consume `useAuth()` to conditionally render user info and Logout state.