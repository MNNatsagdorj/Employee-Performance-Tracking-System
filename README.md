# Employee Performance Tracking System 🚀

**Version 2.0 - Role-Based Collaboration Platform**

A comprehensive, hierarchical employee performance tracking and project management system built with React 18, TypeScript, and modern web technologies. This enterprise-grade application features role-based access control, team management, task assignment workflows, and performance analytics.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Organizational Roles](#organizational-roles)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [Architecture](#architecture)
- [Page Overview](#page-overview)
- [Data Flow](#data-flow)
- [Screenshots](#screenshots)
- [Contributing](#contributing)

---

## 🎯 Overview

The Employee Performance Tracking System is designed to manage teams, projects, and tasks across an organization with a hierarchical role-based structure. It enables:

- **Owners** to oversee the entire organization
- **Team Managers** to create and manage teams
- **Project Managers** to break down projects into tasks and assign work
- **Developers** to claim available tasks and track their progress

The system automatically calculates performance scores based on task completion, story points, and adherence to deadlines.

---

## ✨ Key Features

### 🏢 Organizational Management
- **Hierarchical Role System**: Owner → Team Manager → PM → Developer
- **Team Management**: Create, view, and manage multiple teams
- **Member Management**: Assign roles and teams to users
- **Role-Based Navigation**: Dynamic sidebar based on user permissions

### 📊 Project & Task Management
- **Project Dashboard**: View all projects with progress tracking
- **PM Dashboard**: Break down projects into tasks with story points
- **Task Assignment**: Assign tasks directly or leave available for developers
- **Developer Task Board**: Browse and claim available tasks
- **Kanban Board**: Visual task status tracking
- **Task Lifecycle**: AVAILABLE → TODO → IN_PROGRESS → REVIEW → COMPLETED

### 📈 Performance Tracking
- **Story Points System**: Fibonacci-based estimation (1, 2, 3, 5, 8, 13)
- **Difficulty Levels**: Easy, Medium, Hard
- **Score Calculation**: Base score = Story Points × 2
- **Delay Penalties**: Automatic deductions for late completions
- **Monthly Targets**: Track individual and team performance

### 📱 Modern UX/UI
- **Dark/Light Theme**: Full theme support with smooth transitions
- **Responsive Design**: Desktop, tablet, and mobile optimized
- **Role Indicators**: Color-coded badges and icons
  - 👑 Crown (Yellow) - Owner
  - 🛡 Shield (Blue) - Team Manager
  - 📋 Clipboard (Green) - PM
  - 💻 Code (Purple) - Developer
- **Real-time Updates**: Optimistic UI updates with React Query
- **Toast Notifications**: Success/error feedback
- **Skeleton Loading**: Professional loading states

---

## 👥 Organizational Roles

### 1. Owner (사장 / Admin) 👑
**Full Access to Everything**

- View all projects, teams, users, and performance analytics
- Access to organization-wide reports and dashboards
- Team and project comparison views
- System settings and configuration

**Visible Pages:**
- Dashboard
- Teams
- Members
- Projects
- PM Dashboard
- Tasks
- Score Report
- Analytics
- Settings

---

### 2. Team Manager (개발 팀장 / 쇼퍼 관리자) 🛡
**Team Leadership & Oversight**

- Create and manage teams (Backend Team, Frontend Team, QA Team, etc.)
- Assign PMs and developers to teams
- View team performance reports and analytics
- Oversee all team tasks and progress

**Responsibilities:**
- Team composition and structure
- Resource allocation across teams
- Performance monitoring
- Collaboration with PMs

**Visible Pages:**
- Dashboard
- Teams
- Members
- Projects
- PM Dashboard
- Tasks
- Score Report
- Analytics
- Settings

---

### 3. Project Manager (PM) 📋
**Project Breakdown & Task Management**

- Receive projects and break them into manageable tasks
- Define task requirements:
  - Title and description
  - Story points (complexity estimation)
  - Difficulty level
  - Due date
  - Assigned developer (optional)
- Review developer submissions
- Approve tasks for scoring

**Task Assignment Options:**
- **Direct Assignment**: Assign task to a specific developer → Status: TODO
- **Open Assignment**: Leave unassigned → Status: AVAILABLE (developers can claim)

**Visible Pages:**
- Dashboard
- Projects
- PM Dashboard (Task Creation & Management)
- Tasks
- Score Report
- Analytics
- Settings

---

### 4. Developer 💻
**Task Execution & Delivery**

- View available tasks in assigned team
- Claim open tasks (self-assignment)
- Work on assigned tasks
- Submit completed work for PM review
- Track personal performance and scores

**Workflow:**
1. Browse "Available Tasks" tab
2. Review task details (story points, difficulty, deadline)
3. Click "Take Task" to claim ownership → Status: TODO
4. Click "Start" to begin work → Status: IN_PROGRESS
5. Complete work and "Submit for Review" → Status: REVIEW
6. PM reviews and approves → Status: COMPLETED
7. Earn performance points!

**Visible Pages:**
- Dashboard
- Projects
- Developer Tasks (Available & My Tasks)
- Tasks
- Score Report
- My Profile
- Settings

---

## 🛠 Tech Stack

### Core Technologies
- **React 18** - UI library with concurrent features
- **TypeScript** - Type-safe development
- **Vite** - Lightning-fast build tool
- **React Router v6** - Client-side routing

### Styling & UI
- **TailwindCSS** - Utility-first CSS framework
- **Class Variance Authority (CVA)** - Component variants
- **Lucide React** - Modern icon library
- **Recharts** - Data visualization

### State Management
- **Zustand** - Lightweight state management
  - `authStore` - Authentication and user state
  - `themeStore` - Dark/light theme
  - `toastStore` - Notification system
  - `teamsStore` - Team management
  - `rolesStore` - User roles and permissions

### Data Fetching
- **React Query (TanStack Query)** - Server state management
- **Axios** - HTTP client
- **Axios Mock Adapter** - Mock API for prototyping

---

## 🚀 Getting Started

### Prerequisites
- Node.js 16+ and npm/yarn
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/MNNatsagdorj/Employee-Performance-Tracking-System.git
cd Employee-Performance-Tracking-System

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Login Credentials (Mock)
You can log in with any email/password combination. The system will authenticate you as:
- **Default User**: Robert Taylor (Senior Backend Developer, DEVELOPER role)
- **Email**: Any valid email format
- **Password**: Any password

To test different roles, modify `currentUser` in `src/lib/mockData.ts`.

---

## 📐 Architecture

### Project Structure

```
src/
├── components/
│   ├── common/          # Reusable UI components
│   │   ├── Avatar.tsx
│   │   ├── Badge.tsx
│   │   ├── Button.tsx
│   │   ├── Card.tsx
│   │   ├── Input.tsx
│   │   ├── Modal.tsx
│   │   ├── Progress.tsx
│   │   ├── Skeleton.tsx
│   │   ├── Table.tsx
│   │   └── Toast.tsx
│   └── project/         # Feature-specific components
│       └── CreateProjectModal.tsx
├── layouts/
│   ├── MainLayout.tsx   # Main app layout with sidebar
│   ├── Navbar.tsx       # Top navigation bar
│   └── Sidebar.tsx      # Role-based sidebar navigation
├── pages/
│   ├── Login.tsx
│   ├── Dashboard.tsx
│   ├── TeamsPage.tsx              # Team list (Owner, Manager)
│   ├── TeamDetailPage.tsx         # Team details (Owner, Manager)
│   ├── RolesAndMembersPage.tsx    # User management (Owner, Manager)
│   ├── ProjectAssignmentPage.tsx  # PM task creation (PM)
│   ├── DeveloperTasksPage.tsx     # Developer tasks (Developer)
│   ├── Projects.tsx
│   ├── Tasks.tsx
│   ├── CreateTaskPage.tsx
│   ├── TasksBoardPage.tsx
│   ├── ScoreReport.tsx
│   ├── Analytics.tsx
│   ├── TeamMembersPage.tsx
│   ├── MyPage.tsx
│   ├── SystemSettingsPage.tsx
│   └── Settings.tsx
├── stores/
│   ├── authStore.ts     # Authentication state
│   ├── themeStore.ts    # Theme management
│   ├── toastStore.ts    # Notifications
│   ├── teamsStore.ts    # Team state
│   └── rolesStore.ts    # User roles
├── lib/
│   ├── mockApi.ts       # Mock API endpoints
│   ├── mockData.ts      # Mock data with teams & roles
│   └── utils.ts         # Utility functions
├── types/
│   └── index.ts         # TypeScript interfaces
├── App.tsx              # Main app with routes
├── main.tsx             # Entry point
└── index.css            # Global styles
```

### State Management Flow

```
┌─────────────────┐
│   User Action   │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ React Component │
└────────┬────────┘
         │
    ┌────┴─────┐
    │          │
    ▼          ▼
┌─────────┐ ┌──────────┐
│ Zustand │ │  React   │
│  Store  │ │  Query   │
└─────────┘ └────┬─────┘
                  │
                  ▼
            ┌──────────┐
            │ Mock API │
            └────┬─────┘
                  │
                  ▼
            ┌──────────┐
            │Mock Data │
            └──────────┘
```

---

## 📄 Page Overview

### 🏠 Dashboard
**All Roles**
- Monthly score progress (current vs target)
- Task summary (completed, pending, in progress)
- Recent tasks table
- Upcoming deadlines
- Performance trends

---

### 👥 Teams Page
**Owner, Team Manager**
- Grid view of all teams
- Team stats (members, projects, score)
- Create new team button
- Click team to view details

**Features:**
- Team member avatars
- Manager and PM information
- Project count and total score
- Active status badges

---

### 📋 Team Detail Page
**Owner, Team Manager**
- Complete team information
- Leadership section (Manager & PM)
- Member table with roles and scores
- Assigned projects list
- Performance metrics

---

### 🧑‍🤝‍🧑 Roles & Members Page
**Owner, Team Manager**
- Searchable user list
- Filter by role (Owner, Manager, PM, Developer)
- Role distribution cards
- Edit user roles and team assignments
- Role descriptions and permissions

**Table Columns:**
- Profile (avatar + name)
- Role (color-coded badge)
- Position
- Email
- Team assignment
- Monthly score / target
- Status (active/inactive)

---

### 📊 PM Dashboard (Project Assignment)
**PM, Team Manager, Owner**
- Create new tasks with full details:
  - Project selection
  - Title & description
  - Story points (1-13)
  - Difficulty (Easy/Medium/Hard)
  - Due date
  - Optional developer assignment
- View all created tasks
- Task status overview (Available, TODO, In Progress, Review, Completed)
- Filter and search tasks

**Task States:**
- **AVAILABLE**: No developer assigned, open for claiming
- **TODO**: Assigned to developer, not started
- **IN_PROGRESS**: Developer working on it
- **REVIEW**: Submitted for PM review
- **COMPLETED**: Approved by PM

---

### 💻 Developer Tasks Page
**Developer**

**Two Tabs:**

#### 1️⃣ Available Tasks
- Browse all unassigned tasks
- View task details (story points, difficulty, due date, project)
- See potential score earnings
- Click to view full details
- "Take Task" button to claim ownership

**Card Info:**
- Task title & description
- Project name
- Story points badge
- Difficulty badge (color-coded)
- Base score
- Due date (red if overdue, orange if urgent)

#### 2️⃣ My Tasks
- View all your assigned tasks
- Grouped by status (TODO, In Progress, Review, Completed)
- Action buttons:
  - TODO → "Start" button
  - In Progress → "Submit for Review" button
- Status-based indicators

---

### 📁 Projects Page
**All Roles**
- Project cards with progress bars
- Create new project (modal with validation)
- Filter by status
- Project details (members, timeline, task count)
- Skeleton loading states

---

### ✅ Tasks Page
**All Roles**
- List view of all tasks
- Filters (status, project, assignee)
- Buttons:
  - "+ Create Task" (navigates to creation page)
  - "Board View" (navigates to Kanban)
- Task details and status badges

---

### 🎯 Kanban Board
**All Roles**
- Visual task board with columns:
  - To Do
  - In Progress
  - Review
  - Completed
- Task cards show:
  - Title
  - Story point badge
  - Assigned user avatar
  - Due date (color-coded)
  - Difficulty badge
- Buttons: "+ New Task", "List View"

---

### 📈 Score Report
**All Roles**
- Monthly score summary
- Task breakdown table:
  - Task name
  - Base score
  - Delay penalty
  - Final score
  - Completion date
  - Due date
  - Days late
- Total score vs target

---

### 📊 Analytics
**Owner, Team Manager, PM**
- Monthly performance overview cards
- Score trend chart (weekly)
- Task distribution pie chart
- Project performance comparison
- Top performers leaderboard
- Daily activity charts
- Quick insights

---

### 👤 My Profile
**All Roles**

**Left Panel:**
- Profile card with avatar
- Name, email, role, position
- Quick stats
- "Edit Profile" button

**Right Panel - Three Tabs:**
1. **Overview**: Monthly score progress + current tasks
2. **Performance**: Line/bar charts of historical performance
3. **Tasks**: Table of all your tasks with status

---

### ⚙️ System Settings
**All Roles**

**Three Tabs:**
1. **General Settings**:
   - Company name
   - Logo upload (UI)
   - Default timezone

2. **Score Rules**:
   - Monthly target score
   - Delay penalty per day
   - Minimum score floor
   - Live calculation example

3. **Roles & Permissions**:
   - Table of roles with checkboxes
   - Can Assign Tasks
   - Can Edit Projects
   - Can View Scoreboard

---

## 🔄 Data Flow

### Task Creation Flow (PM → Developer)

```
┌──────────┐     ┌─────────────┐     ┌──────────────┐
│    PM    │────▶│ Create Task │────▶│ Set Details  │
└──────────┘     └─────────────┘     └──────┬───────┘
                                             │
                                    ┌────────┴────────┐
                                    │                 │
                        ┌───────────▼──────┐  ┌──────▼──────────┐
                        │ Assign Developer │  │ Leave Available │
                        └───────────┬──────┘  └──────┬──────────┘
                                    │                 │
                            ┌───────▼─────────────────▼────────┐
                            │      Task Created in System      │
                            └───────┬──────────────────────────┘
                                    │
                        ┌───────────┴─────────────┐
                        │                         │
                ┌───────▼────────┐       ┌───────▼─────────┐
                │ Status: TODO   │       │Status: AVAILABLE│
                │ (Assigned)     │       │ (For claiming)  │
                └────────────────┘       └─────────────────┘
```

### Developer Task Workflow

```
┌─────────────┐     ┌──────────────┐     ┌───────────────┐
│  AVAILABLE  │────▶│   Take Task  │────▶│     TODO      │
└─────────────┘     └──────────────┘     └───────┬───────┘
                                                  │
                                          ┌───────▼────────┐
                                          │ Click "Start"  │
                                          └───────┬────────┘
                                                  │
                                          ┌───────▼────────┐
                                          │  IN_PROGRESS   │
                                          └───────┬────────┘
                                                  │
                                      ┌───────────▼──────────────┐
                                      │ Submit for Review        │
                                      └───────────┬──────────────┘
                                                  │
                                          ┌───────▼────────┐
                                          │     REVIEW     │
                                          └───────┬────────┘
                                                  │
                                      ┌───────────▼──────────────┐
                                      │ PM Approves with Score   │
                                      └───────────┬──────────────┘
                                                  │
                                          ┌───────▼────────┐
                                          │   COMPLETED    │
                                          │ Score Applied  │
                                          └────────────────┘
```

---

## 🎨 Design Principles

### Color System

**Role Indicators:**
- 🟡 Yellow: Owner (Crown icon)
- 🔵 Blue: Team Manager (Shield icon)
- 🟢 Green: PM (Clipboard icon)
- 🟣 Purple: Developer (Code icon)

**Task Difficulty:**
- 🟢 Green: Easy
- 🟠 Orange: Medium
- 🔴 Red: Hard

**Task Status:**
- ⚪ Gray: Available, TODO
- 🔵 Blue: In Progress
- 🟠 Orange: Review
- 🟢 Green: Completed
- 🔴 Red: Blocked

### Typography
- **Headings**: Bold, clear hierarchy
- **Body**: Readable, comfortable sizing
- **Badges**: Small, uppercase labels

### Spacing
- Consistent gap-6 for major sections
- gap-4 for card grids
- Generous padding for readability

---

## 🔐 Authentication & Authorization

### Login Flow
1. User enters email/password
2. Mock API validates (any credentials accepted)
3. User object returned with role
4. `authStore` updates with user + token
5. Redirect to `/dashboard`
6. Sidebar renders based on role

### Protected Routes
- All routes (except login) require authentication
- `MainLayout` checks `isAuthenticated`
- Redirects to login if not authenticated

### Role-Based UI
- Sidebar navigation items filter by role
- Pages can check `user.role` for conditional rendering
- Some pages are only visible to specific roles

---

## 📱 Responsive Design

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md/lg)
- **Desktop**: > 1024px (xl)

### Mobile Features
- Hamburger menu for sidebar
- Collapsible navigation
- Stacked layouts for cards/tables
- Touch-friendly button sizes

---

## 🧪 Testing the System

### Scenario 1: PM Creates and Assigns Task
1. Log in as PM (change `currentUser` to PM in mockData.ts)
2. Go to "PM Dashboard"
3. Click "+ Create Task"
4. Fill in task details
5. Select a developer from dropdown
6. Click "Create Task"
7. Task appears in table with status "TODO"
8. Developer sees it in "My Tasks" tab

### Scenario 2: Developer Claims Available Task
1. Log in as Developer
2. Go to "Developer Tasks"
3. Click "Available Tasks" tab
4. Browse tasks with story points and difficulty
5. Click a task card
6. Review details in modal
7. Click "Take This Task"
8. Task moves to "My Tasks" → "TODO"

### Scenario 3: Developer Completes Task
1. In "My Tasks" → "TODO" section
2. Click "Start" on a task → Status: IN_PROGRESS
3. Complete the work (external)
4. Click "Submit for Review" → Status: REVIEW
5. PM reviews (in PM Dashboard)
6. PM approves → Status: COMPLETED
7. Score added to developer's monthly total

---

## 🚧 Roadmap & Future Enhancements

### Phase 1: Current (v2.0) ✅
- Hierarchical role system
- Team and member management
- Task creation and assignment
- Developer task claiming
- Performance scoring

### Phase 2: Planned
- [ ] Real backend API integration
- [ ] User authentication (OAuth, JWT)
- [ ] Email notifications
- [ ] File attachments on tasks
- [ ] Task comments and activity log
- [ ] Advanced analytics (team comparisons, trends)
- [ ] Drag-and-drop on Kanban board
- [ ] Real-time updates (WebSocket)
- [ ] Export reports (PDF, Excel)
- [ ] Calendar view for deadlines

### Phase 3: Advanced
- [ ] AI-powered task estimation
- [ ] Automated performance insights
- [ ] Integration with Git (GitHub, GitLab)
- [ ] Time tracking
- [ ] Sprint planning
- [ ] Burndown charts
- [ ] Mobile app (React Native)

---

## 📦 Deployment

### Build for Production

```bash
npm run build
```

Output will be in `dist/` folder.

### Deployment Options

**Static Hosting:**
- Vercel: `vercel deploy`
- Netlify: Drag `dist/` folder
- GitHub Pages: `npm run build && gh-pages -d dist`

**Environment Variables:**
Create `.env` file:
```
VITE_API_URL=https://your-api.com
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Style
- Use TypeScript for type safety
- Follow existing component patterns
- Use Tailwind for styling
- Write meaningful commit messages

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**MNNatsagdorj**
- GitHub: [@MNNatsagdorj](https://github.com/MNNatsagdorj)

---

## 🙏 Acknowledgments

- Inspired by Linear.app, Notion, Jira, and Azure DevOps
- Built with modern React ecosystem
- Icons by Lucide React
- UI components with TailwindCSS

---

## 📞 Support

For questions or issues, please open an issue on GitHub:
https://github.com/MNNatsagdorj/Employee-Performance-Tracking-System/issues

---

**Built with ❤️ using React, TypeScript, and TailwindCSS**
