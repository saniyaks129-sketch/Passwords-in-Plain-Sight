# Changes & Role Gap Audit — Milestone 06 / Challenge #5

## 1. Role Gap Audit
Before implementing RBAC, a regular user token (`user@expenseapp.io`) was able to perform all sensitive actions:

| Action | HTTP Method | Endpoint | Initial Response Code | Status |
|---|---|---|---|---|
| Approve Expense | `PUT` | `/api/expenses/:id/approve` | `200 OK` | ❌ Vulnerable |
| Reject Expense | `PUT` | `/api/expenses/:id/reject` | `200 OK` | ❌ Vulnerable |
| Delete Expense | `DELETE` | `/api/expenses/:id` | `200 OK` | ❌ Vulnerable |
| Change User Role | `PUT` | `/api/users/:id/role` | `200 OK` | ❌ Vulnerable |
| View All Users | `GET` | `/api/users` | `200 OK` | ❌ Vulnerable |
| View All Expenses | `GET` | `/api/expenses` | `200 OK` | ❌ Vulnerable |

---

## 2. Root Cause Analysis
- **Missing Role Authorization Middleware:** Routes only used `authMiddleware` (validating identity) but lacked `requireRole` middleware checks.
- **Unrestricted Token Payload:** JWT tokens lacked explicit user role fields during generation.
- **Missing Resource Ownership Check:** Controllers allowed users to modify expenses without validating if `submittedBy` matched `req.user.userId`.

---

## 3. Access Model Table

| Endpoint | Method | Allowed Roles |
|---|---|---|
| `/api/expenses` | `POST` | `user`, `manager`, `admin` |
| `/api/expenses/mine` | `GET` | `user`, `manager`, `admin` |
| `/api/expenses` | `GET` | `manager`, `admin` |
| `/api/expenses/:id/approve` | `PUT` | `manager`, `admin` |
| `/api/expenses/:id/reject` | `PUT` | `manager`, `admin` |
| `/api/expenses/:id` | `DELETE` | `admin` |
| `/api/users` | `GET` | `admin` |
| `/api/users/:id/role` | `PUT` | `admin` |
| `/api/users/me` | `GET` | `user`, `manager`, `admin` |

---

## 4. What I Fixed
- Added `role` to `User` Schema and signed `role` inside JWT token payload.
- Created `requireRole(...allowedRoles)` factory function middleware.
- Protected all routes according to the Access Model matrix.
- Enforced resource ownership validation inside expense update controllers.

---

## 5. Verification Results

| Scenario | Token Role | Expected Status | Actual Status | Screenshot File |
|---|---|---|---|---|
| Regular user approves expense | `user` | `403` | `403` | `screenshots/01-user-approve.png` |
| Regular user deletes expense | `user` | `403` | `403` | `screenshots/04-user-edit-other.png` |
| Regular user changes user role | `user` | `403` | `403` | `screenshots/03-user-role.png` |
| Regular user edits another's expense | `user` | `403` | `403` | `screenshots/04-user-edit-other.png` |
| Manager approves expense | `manager` | `200` | `200` | `screenshots/05-manager-approve.png` |
| Manager changes user role | `manager` | `403` | `403` | `screenshots/06-manager-role.png` |
| Admin deletes expense | `admin` | `200` | `200` | `screenshots/07-admin-delete.png` |
| Admin changes user role | `admin` | `200` | `200` | `screenshots/08-admin-role.png` |