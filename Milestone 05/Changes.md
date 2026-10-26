# FocusForge Architecture Refactoring Documentation

## Executive Summary
The `DashboardPage.jsx` file previously functioned as a monolithic "God Component" containing over 250 lines of unorganized JSX layout, state declarations, filtering logic, and inline item rendering. 

This refactor untangles the monolith into a modular, highly maintainable component hierarchy adhering to the **Single Responsibility Principle (SRP)**, strict prop contracts, and clear directory separation between page-specific composers and context-free shared UI primitives.

---

## Component Architecture Breakdown

### Shared Components (`src/components/shared/`)
1. **`StatCard.jsx`**
   - **Responsibility**: Context-agnostic card rendering displaying a metric title, numerical count, icon, and contextual subtitle.
   - **Props**: `{ title, count, subtitle, icon, colorClass }`
   - **Reason for `shared/`**: Has zero awareness of tasks or dashboards; reusable on analytics, profile, or admin pages.

2. **`TaskItem.jsx`**
   - **Responsibility**: Presentational row component rendering task metadata, completion toggle state, category badge, and deletion trigger.
   - **Props**: `{ task, onToggleTask, onDeleteTask }`
   - **Reason for `shared/`**: Pure UI component configurable via props; portable across desktop lists, mobile drawers, or modal task views.

---

### Dashboard Components (`src/components/dashboard/`)
1. **`DashboardHeader.jsx`**
   - **Responsibility**: Page header displaying FocusForge application title and user guidance.
   - **Props**: `{ title, subtitle }`
   - **Reason for `dashboard/`**: Specific to the main dashboard layout context.

2. **`StatsRow.jsx`**
   - **Responsibility**: Layout container organizing aggregate task metrics using `StatCard` instances.
   - **Props**: `{ totalTasks, completedTasks, pendingTasks }`
   - **Reason for `dashboard/`**: Encapsulates dashboard-specific metric groupings.

3. **`AddTaskInput.jsx`**
   - **Responsibility**: Form control capturing new task titles and category choices with submission validation.
   - **Props**: `{ taskTitle, setTaskTitle, category, setCategory, onAddTask }`
   - **Reason for `dashboard/`**: Form layout tuned specifically for dashboard quick-add workflows.

4. **`TaskFilterBar.jsx`**
   - **Responsibility**: Navigation control rendering tab buttons for filtering active task lists (`all`, `pending`, `completed`).
   - **Props**: `{ currentFilter, onFilterChange }`
   - **Reason for `dashboard/`**: Directly coupled to task list display state.

5. **`TaskList.jsx`**
   - **Responsibility**: Iterative renderer handling array mapping over `TaskItem` instances and rendering fallback empty states.
   - **Props**: `{ tasks, onToggleTask, onDeleteTask }`
   - **Reason for `dashboard/`**: Manages the main task collection display layout.

---

## Refactored Composer Page (`src/pages/DashboardPage.jsx`)
`DashboardPage.jsx` now acts exclusively as state owner and layout composer:
- **State Ownership**: Holds task arrays, active filters, and input field states.
- **Derived State**: Computes metric totals (`totalTasks`, `completedTasks`, `pendingTasks`) and applies filtering on the fly.
- **JSX Layout**: Contains zero raw layout elements, reading purely like an architectural table of contents.