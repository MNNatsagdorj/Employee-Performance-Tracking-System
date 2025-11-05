# Employee Performance Tracking System

A professional, enterprise-grade Employee Performance / Project Management system prototype built with React 18, TypeScript, Vite, and TailwindCSS.

## Features

- 🎨 **Enterprise-grade UI** - Inspired by Linear.app, Notion, and Azure DevOps
- 🌓 **Dark/Light Theme** - Seamless theme switching with persistence (Zustand + localStorage)
- 📊 **Performance Dashboard** - Track scores, tasks, and deadlines
- 📋 **Project Management** - Manage projects and tasks efficiently
- 🎯 **Score Tracking** - Monitor performance metrics and scoring
- 📱 **Fully Responsive** - Mobile hamburger menu, tablet & desktop optimized
- ⏳ **Skeleton Loading** - Beautiful loading states for all async operations
- 🎯 **Create Project Modal** - Full form with validation and error handling
- ✍️ **Create Task Page** - Comprehensive task creation with dropdowns and validation
- 📋 **Kanban Board** - Visual task management with 4 columns (To Do, In Progress, Review, Completed)
- 👥 **Team Members** - Manage team members with roles, performance scores, and status tracking
- 👤 **My Profile** - Personal dashboard with score summary, performance charts, and task management
- ⚙️ **System Settings** - Configure company info, scoring rules, and role-based permissions
- 📊 **Analytics Dashboard** - Comprehensive analytics with charts, top performers, and insights (Recharts)
- 🔔 **Toast Notifications** - Success, error, warning, and info notifications
- 🗃️ **Zustand State Management** - Global state for auth, theme, and toasts
- 🔐 **Protected Routes** - Authentication-based route protection

## Tech Stack

- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **TailwindCSS** - Utility-first CSS framework (with dark mode class strategy)
- **Zustand** - Lightweight state management (~1KB)
- **React Query** - Data fetching and caching
- **React Router** - Client-side routing
- **Lucide React** - Beautiful icon library
- **Class Variance Authority** - Component variants
- **Axios Mock Adapter** - API simulation

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open your browser and navigate to `http://localhost:5173`

4. Login with any credentials (mock authentication):
```
Email: test@example.com
Password: password
```

5. Explore the features:
   - Toggle dark/light theme (navbar top-right)
   - Test responsive layout (resize window or use mobile view)
   - Create a new project (Projects page → Create Project button)
   - Create a new task (Tasks page → Create Task button)
   - View Kanban board (Tasks page → Board View button)
   - View team members (Sidebar → Team)
   - View your profile (Click user avatar → My Profile)
   - Configure system settings (Sidebar → Settings)
   - See skeleton loading states (refresh any page)
   - Get toast notifications (login, create project, etc.)

## Project Structure

```
src/
 ├── components/
 │   ├── common/          # Reusable UI components (Button, Modal, Toast, Skeleton, etc.)
 │   └── project/         # Project-specific components (CreateProjectModal)
 ├── pages/               # Page components (Dashboard, Projects, Tasks, etc.)
 ├── layouts/             # Layout components (Sidebar, Navbar, MainLayout)
 ├── stores/              # Zustand stores (auth, theme, toast)
 ├── lib/                 # Utilities, mock API, and helpers
 └── types/               # TypeScript type definitions
```

## Key Files

- `src/stores/authStore.ts` - Authentication state management
- `src/stores/themeStore.ts` - Dark/light theme management
- `src/stores/toastStore.ts` - Toast notification management
- `src/components/common/Modal.tsx` - Reusable modal component
- `src/components/common/Toast.tsx` - Toast notification UI
- `src/components/common/Skeleton.tsx` - Loading skeleton components
- `src/components/project/CreateProjectModal.tsx` - Project creation form

## Mock Data

This prototype uses `axios-mock-adapter` to simulate API responses. No backend is required.

## Build

```bash
npm run build
```

## Recent Enhancements 🆕

See [ENHANCEMENTS.md](./ENHANCEMENTS.md) for detailed information about the latest features:

- ✅ Enhanced dark mode with Zustand + localStorage persistence
- ✅ Fully responsive layout (mobile hamburger menu, responsive grids)
- ✅ Skeleton loading states for all async operations
- ✅ Create Project modal with full validation
- ✅ Toast notification system (success, error, warning, info)
- ✅ Zustand for global state management (auth, theme, toasts)
- ✅ Protected routes with automatic redirects

## Documentation

- [README.md](./README.md) - This file (overview and getting started)
- [ENHANCEMENTS.md](./ENHANCEMENTS.md) - Detailed guide to new features
- [QUICKSTART.md](./QUICKSTART.md) - Quick start guide
- [FEATURES.md](./FEATURES.md) - Comprehensive feature list

## License

MIT

