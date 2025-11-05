# Quick Start Guide

## 🚀 Getting Started

Follow these steps to run the Employee Performance Tracking System prototype:

### 1. Install Dependencies

```bash
npm install
```

This will install all required packages including:
- React 18 & React DOM
- TypeScript
- Vite
- TailwindCSS
- React Query
- React Router
- Lucide Icons
- Axios & Mock Adapter
- And more...

### 2. Start Development Server

```bash
npm run dev
```

The application will start on `http://localhost:5173`

### 3. Login

The login page uses mock authentication. You can enter any email and password to access the system.

**Default credentials (any email/password will work):**
- Email: `sarah.johnson@company.com`
- Password: `password`

### 4. Explore the Pages

Once logged in, you'll have access to:

1. **Dashboard** (`/dashboard`)
   - Monthly score progress
   - Recent tasks table
   - Upcoming deadlines
   - Performance statistics

2. **Projects** (`/projects`)
   - Grid view of all projects
   - Progress tracking
   - Team members
   - Project statistics

3. **Tasks** (`/tasks`)
   - All tasks table view
   - Task detail page with timeline
   - Status and priority badges
   - Assignment information

4. **Score Report** (`/score-report`)
   - Monthly score summary
   - Detailed score breakdown
   - Penalty tracking
   - Performance tips

5. **Analytics** (`/analytics`)
   - Coming soon placeholder

6. **Settings** (`/settings`)
   - Coming soon placeholder

## 🎨 Theme Toggle

Click the sun/moon icon in the top right navbar to toggle between light and dark themes.

## 📦 Build for Production

```bash
npm run build
```

This will create an optimized production build in the `dist` folder.

## 🧪 Mock Data

The application uses `axios-mock-adapter` to simulate API responses. All data is defined in:
- `src/lib/mockData.ts` - Mock data definitions
- `src/lib/mockApi.ts` - Mock API endpoints

To add or modify data, simply edit these files.

## 🛠️ Tech Stack

- **React 18** - UI Framework
- **TypeScript** - Type Safety
- **Vite** - Build Tool
- **TailwindCSS** - Styling
- **React Query** - Data Fetching
- **React Router** - Routing
- **Lucide React** - Icons
- **Class Variance Authority** - Component Variants

## 📁 Project Structure

```
src/
├── components/
│   └── common/          # Reusable UI components
├── layouts/             # Layout components (Sidebar, Navbar)
├── pages/               # Page components
├── lib/                 # Utilities and mock API
├── types/               # TypeScript type definitions
├── App.tsx              # Main app component
├── main.tsx             # Entry point
└── index.css            # Global styles
```

## 🎯 Key Features

✅ Enterprise-grade UI inspired by Linear.app and Azure DevOps
✅ Dark/Light theme support
✅ Responsive layout with fixed sidebar
✅ Modular and reusable components
✅ Type-safe with TypeScript
✅ Mock API with realistic data
✅ Performance tracking and scoring
✅ Project and task management
✅ Beautiful data tables and cards

## 💡 Tips

- All components use Tailwind utility classes
- Components are built with accessibility in mind
- The design system uses CSS variables for theming
- Mock API has a 500ms delay to simulate real API calls

Enjoy exploring the prototype! 🎉

