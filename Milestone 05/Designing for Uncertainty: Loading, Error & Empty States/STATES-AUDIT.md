# ShopDash State Audit Report

## 1. Initial State Observations
- **Orders Page:** Shows a blank white container during API fetch. Displays an unstyled empty container on network failures. Shows a blank list if no orders exist.
- **Products Page:** Displays no visual indicator during load; blank screen on error; no contextual message when inventory is empty.
- **Customers Page:** Silence on load; silent failure on API error; empty white space when 0 records return.

## 2. Missing States Checklist
| Screen | Loading State | Error State | Empty State |
| :--- | :--- | :--- | :--- |
| Orders List | Missing (Blank) | Missing (Silent) | Missing (Blank) |
| Products List | Missing (Blank) | Missing (Silent) | Missing (Blank) |
| Customers List | Missing (Blank) | Missing (Silent) | Missing (Blank) |

## 3. Design Decisions
- **Loading:** Using `SkeletonCard` with `animate-pulse` Tailwind utilities to mimic card layouts and reduce perceived wait times.
- **Error:** Using `ErrorMessage` with friendly contextual guidance and an explicit `onRetry` action button.
- **Empty:** Using `EmptyState` with descriptive messaging and a Call-to-Action button leading users back to relevant routes.