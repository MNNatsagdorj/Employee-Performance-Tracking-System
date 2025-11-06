import { create } from 'zustand'
import { User, UserRole } from '@/types'

interface RolesStore {
  users: User[]
  setUsers: (users: User[]) => void
  updateUserRole: (userId: string, role: UserRole) => void
  updateUserTeam: (userId: string, teamId: string) => void
  getUsersByRole: (role: UserRole) => User[]
  getUsersByTeam: (teamId: string) => User[]
  addUser: (user: User) => void
  updateUser: (userId: string, updates: Partial<User>) => void
  deleteUser: (userId: string) => void
}

export const useRolesStore = create<RolesStore>((set, get) => ({
  users: [],
  
  setUsers: (users) => set({ users }),
  
  updateUserRole: (userId, role) => set((state) => ({
    users: state.users.map((user) =>
      user.id === userId ? { ...user, role } : user
    ),
  })),
  
  updateUserTeam: (userId, teamId) => set((state) => ({
    users: state.users.map((user) =>
      user.id === userId ? { ...user, teamId } : user
    ),
  })),
  
  getUsersByRole: (role) => get().users.filter((user) => user.role === role),
  
  getUsersByTeam: (teamId) => get().users.filter((user) => user.teamId === teamId),
  
  addUser: (user) => set((state) => ({
    users: [...state.users, user],
  })),
  
  updateUser: (userId, updates) => set((state) => ({
    users: state.users.map((user) =>
      user.id === userId ? { ...user, ...updates } : user
    ),
  })),
  
  deleteUser: (userId) => set((state) => ({
    users: state.users.filter((user) => user.id !== userId),
  })),
}))

