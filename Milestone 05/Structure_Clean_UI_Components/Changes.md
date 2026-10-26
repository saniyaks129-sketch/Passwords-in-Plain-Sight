# Refactoring Documentation: FocusForge Dashboard

## Live Application
[https://focusforge-component-architecture-iota.vercel.app/]

## Architectural Decisions & Component Responsibilities

### `src/components/shared/`
- **`StatCard.jsx`**: Pure presentation component displaying a metric label and value. Context-free.
- **`TaskItem.jsx`**: Pure presentation component rendering a single task row with action handlers.

### `src/components/dashboard/`
- **`DashboardHeader.jsx`**: Renders title and welcome subtitle for the page.
- **`StatsRow.jsx`**: Layout component organizing calculated metrics into `StatCard` instances.
- **`AddTaskInput.jsx`**: Manages controlled form state for task creation before firing `onAddTask`.
- **`TaskFilterBar.jsx`**: Displays task filter options (All, Active, Completed).
- **`TaskList.jsx`**: Handles empty state and renders list of `TaskItem` elements.

## Scaling to 10× Scope
1. **Global State**: Transition state from `DashboardPage.jsx` to Zustand or Context API.
2. **Performance**: Wrap `TaskItem` with `React.memo` and use `useCallback` on handlers to avoid unnecessary re-renders.