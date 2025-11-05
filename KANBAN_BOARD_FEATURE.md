# Kanban Board - Feature Documentation

## 📍 Location
`src/pages/TasksBoardPage.tsx`

## 🎯 Overview
A beautiful Kanban-style task board with four columns for visual task management. Features enterprise-grade UI with color-coded cards, stats overview, and smooth interactions.

---

## ✨ Features

### Kanban Columns

1. **To Do** (Gray)
   - New tasks waiting to be started
   - Count badge showing number of tasks

2. **In Progress** (Yellow)
   - Tasks currently being worked on
   - Active development state

3. **Review** (Purple)
   - Tasks ready for code review
   - Pending approval stage

4. **Completed** (Green)
   - Finished tasks
   - Archive of completed work

---

## 🎴 Task Card Components

Each task card displays:

### 1. **Title**
- Task name with hover effect
- Truncated to 2 lines max
- Hover changes color to primary

### 2. **Story Point Badge**
- Format: "SP 3", "SP 5", etc.
- Outline style with subtle border
- Font-semibold for emphasis

### 3. **Difficulty Badge**
- **Easy**: Green background
  - Light: `bg-green-100 text-green-800`
  - Dark: `bg-green-950 text-green-300`
  
- **Medium**: Orange background
  - Light: `bg-orange-100 text-orange-800`
  - Dark: `bg-orange-950 text-orange-300`
  
- **Hard**: Red background
  - Light: `bg-red-100 text-red-800`
  - Dark: `bg-red-950 text-red-300`

### 4. **Assignee Avatar**
- Shows initials in circular avatar
- 6x6 size (h-6 w-6)
- Displays full name next to avatar

### 5. **Due Date**
- Format: "Feb 10"
- Calendar icon included
- **Red text if overdue** (past current date)
- Normal muted text if on-time

---

## 📊 Statistics Dashboard

Top row shows 5 stat cards:

1. **Total Tasks** - Blue left border
2. **To Do** - Gray left border
3. **In Progress** - Yellow left border
4. **Review** - Purple left border
5. **Completed** - Green left border

Each card shows:
- Large number (count)
- Small label
- Colored left border accent

---

## 🎨 Visual Design

### Card Styling
```css
- Border-radius: rounded-lg
- Shadow: hover:shadow-md
- Transition: duration-200
- Left border: 4px primary accent (thicker on hover)
- Padding: p-4
- Spacing: gap-3
```

### Column Layout
```css
- Background: muted/30 (subtle gray)
- Padding: p-3
- Min-height: 200px
- Rounded: rounded-lg
- Responsive grid: 1/2/4 columns
```

### Hover Effects
- Card shadow increases
- Left border becomes primary color
- Title changes to primary text
- Smooth transitions (200ms)

---

## 📱 Responsive Design

### Mobile (< 640px)
- 1 column layout (stacked vertically)
- Stats in 2-column grid
- Full-width cards
- Horizontal scroll enabled

### Tablet (640px - 1024px)
- 2 columns side by side
- Stats in 5-column grid
- Cards maintain size

### Desktop (> 1024px)
- 4 columns (one per status)
- Full width utilization
- Optimal spacing

### Scroll Handling
- Horizontal scroll for board on small screens
- Min-width: 800px ensures proper layout
- Smooth scrolling behavior

---

## 🔧 Technical Implementation

### Mock Data Structure
```typescript
interface Task {
  id: number
  title: string
  status: 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'COMPLETED'
  storyPoint: number
  assignee: string
  due: string  // YYYY-MM-DD format
  difficulty: 'Easy' | 'Medium' | 'Hard'
}
```

### Sample Data
```typescript
const mockTasks: Task[] = [
  { 
    id: 1, 
    title: 'API Setup', 
    status: 'TODO', 
    storyPoint: 5, 
    assignee: 'John', 
    due: '2025-02-10', 
    difficulty: 'Medium' 
  },
  // ... more tasks
]
```

### Key Functions

#### `isOverdue(dueDate: string): boolean`
Checks if task is past due date
```typescript
const isOverdue = (dueDate: string): boolean => {
  const today = new Date()
  const due = new Date(dueDate)
  return due < today
}
```

#### `getInitials(name: string): string`
Extracts initials from full name
```typescript
const getInitials = (name: string): string => {
  return name.split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
}
```

#### `getDifficultyColor(difficulty: string)`
Returns Tailwind classes for difficulty badge
```typescript
const getDifficultyColor = (difficulty: string) => {
  const colors = {
    Easy: 'bg-green-100 text-green-800 ...',
    Medium: 'bg-orange-100 text-orange-800 ...',
    Hard: 'bg-red-100 text-red-800 ...',
  }
  return colors[difficulty]
}
```

---

## 🚀 Navigation

### Access Points

1. **Tasks Page** → "Board View" button
2. **Direct URL**: `/tasks/board`
3. **Board Page** → "List View" button (back to table)

### Navigation Flow
```
Tasks List (/tasks)
    ↓ Click "Board View"
Kanban Board (/tasks/board)
    ↓ Click "List View"
Tasks List (/tasks)
```

### Action Buttons
- **List View** (Outline) - Navigate to `/tasks`
- **New Task** (Primary) - Navigate to `/tasks/create`

---

## 🎯 Component Structure

```typescript
TasksBoardPage
├── Header (title + buttons)
├── Stats Cards (5 cards)
└── Kanban Board
    └── 4 × KanbanColumn
        └── n × TaskCard
            ├── Title
            ├── Badges (SP + Difficulty)
            └── Footer (Avatar + Due Date)
```

---

## 📋 Testing Checklist

### Visual Tests
- [ ] All 4 columns render correctly
- [ ] Task cards display all information
- [ ] Story point badges show correctly
- [ ] Difficulty badges have correct colors
- [ ] Avatars show initials
- [ ] Due dates show correctly
- [ ] Overdue dates are red
- [ ] Stats cards show accurate counts
- [ ] Column count badges match task count

### Interaction Tests
- [ ] Cards have hover effect
- [ ] Left border changes on hover
- [ ] "List View" button navigates to `/tasks`
- [ ] "New Task" button navigates to `/tasks/create`
- [ ] No drag functionality (not implemented yet)

### Responsive Tests
- [ ] Mobile: Single column stacked layout
- [ ] Tablet: 2 columns side by side
- [ ] Desktop: 4 columns in a row
- [ ] Horizontal scroll works on mobile
- [ ] Stats cards adapt to screen size
- [ ] All text is readable at all sizes

### Data Tests
- [ ] Empty columns show "No tasks" message
- [ ] Tasks filter correctly by status
- [ ] Stats calculate correctly
- [ ] Dates format properly
- [ ] Initials extract correctly

---

## 🔮 Future Enhancements

### Phase 2 - Drag & Drop
```typescript
// Future implementation
import { DndContext, DragEndEvent } from '@dnd-kit/core'

const handleDragEnd = (event: DragEndEvent) => {
  // Update task status based on drop column
  // Call API to persist change
  // Update local state
}
```

### Phase 3 - Additional Features
1. **Filtering**
   - By assignee
   - By difficulty
   - By story points
   - By date range

2. **Sorting**
   - By due date
   - By story points
   - By creation date
   - By assignee

3. **Card Actions**
   - Click to view details
   - Quick edit inline
   - Delete task
   - Assign/reassign

4. **Bulk Operations**
   - Select multiple cards
   - Move all to column
   - Batch delete
   - Mass assign

5. **Swimlanes**
   - Group by assignee
   - Group by project
   - Group by priority

6. **Custom Columns**
   - Add/remove columns
   - Rename columns
   - Reorder columns
   - Custom workflow states

---

## 🎨 Color Reference

### Column Count Badges
```css
secondary variant with minimal styling
```

### Left Border Colors
```css
Total:     border-l-blue-500
To Do:     border-l-gray-500
Progress:  border-l-yellow-500
Review:    border-l-purple-500
Completed: border-l-green-500
```

### Task Card States
```css
Default:  border-l-primary/20
Hover:    border-l-primary (full opacity)
Shadow:   shadow-md on hover
```

---

## 💡 Usage Examples

### Navigate Programmatically
```typescript
import { useNavigate } from 'react-router-dom'

const navigate = useNavigate()
navigate('/tasks/board')
```

### Link Component
```typescript
import { Link } from 'react-router-dom'

<Link to="/tasks/board">
  <Button>View Board</Button>
</Link>
```

---

## 📊 Sample Board Layout

```
┌─────────────────────────────────────────────────────────┐
│ Tasks Board                     [List View] [New Task]  │
├─────────────────────────────────────────────────────────┤
│ [10] Total  [3] To Do  [2] Progress  [2] Review  [3] ✓ │
├─────────────────────────────────────────────────────────┤
│                                                          │
│ TO DO (3)     IN PROGRESS (2)   REVIEW (2)   DONE (3)  │
│ ┌────────┐    ┌────────┐       ┌────────┐   ┌────────┐│
│ │API Setup│    │UI Login│       │Code Rvw│   │Dashboard││
│ │SP 5│Med │    │SP 3│Esy│       │SP 2│Esy│   │SP 8│Hrd ││
│ │John│2/10│    │Alice│OK│       │Dave│OK│   │Frank│Done││
│ └────────┘    └────────┘       └────────┘   └────────┘│
│ ┌────────┐    ┌────────┐       ┌────────┐   ┌────────┐│
│ │Database│    │Perf Opt│       │Deploy  │   │Bug Fix ││
│ │SP 8│Hrd │    │SP 5│Hrd│       │SP 3│Med│   │SP 1│Esy ││
│ │Bob│LATE│    │Iris│OK │       │Emma│OK │   │Grace│OK ││
│ └────────┘    └────────┘       └────────┘   └────────┘│
│ ┌────────┐                                  ┌────────┐│
│ │API Docs│                                  │More... ││
│ │SP 3│Esy │                                  └────────┘│
│ │Henry│OK│                                             │
│ └────────┘                                             │
└─────────────────────────────────────────────────────────┘
```

---

## ✅ Implementation Status

**Current Status: Phase 1 Complete** ✅

- ✅ Four-column Kanban layout
- ✅ Task cards with all required info
- ✅ Story point badges
- ✅ Difficulty color coding
- ✅ Avatar with initials
- ✅ Overdue date highlighting
- ✅ Stats dashboard
- ✅ Responsive design
- ✅ Navigation integration
- ✅ Mock data integration
- ❌ Drag & drop (Phase 2)
- ❌ Filtering/sorting (Phase 2)
- ❌ Card actions (Phase 2)

**Ready for Use: YES** 🚀

---

## 📚 Related Files

- `src/pages/TasksBoardPage.tsx` - Main board component
- `src/pages/Tasks.tsx` - List view with board navigation
- `src/App.tsx` - Route configuration
- `src/components/common/Card.tsx` - Card component
- `src/components/common/Badge.tsx` - Badge component
- `src/components/common/Avatar.tsx` - Avatar component
- `src/components/common/Button.tsx` - Button component

---

**Navigate to `/tasks/board` to see the Kanban board in action!** 🎯

