import { create } from 'zustand'
import { Team } from '@/types'

interface TeamsStore {
  teams: Team[]
  selectedTeam: Team | null
  setTeams: (teams: Team[]) => void
  addTeam: (team: Team) => void
  updateTeam: (id: string, team: Partial<Team>) => void
  deleteTeam: (id: string) => void
  selectTeam: (team: Team | null) => void
  getTeamById: (id: string) => Team | undefined
}

export const useTeamsStore = create<TeamsStore>((set, get) => ({
  teams: [],
  selectedTeam: null,
  
  setTeams: (teams) => set({ teams }),
  
  addTeam: (team) => set((state) => ({ 
    teams: [...state.teams, team] 
  })),
  
  updateTeam: (id, updatedTeam) => set((state) => ({
    teams: state.teams.map((team) =>
      team.id === id ? { ...team, ...updatedTeam } : team
    ),
  })),
  
  deleteTeam: (id) => set((state) => ({
    teams: state.teams.filter((team) => team.id !== id),
    selectedTeam: state.selectedTeam?.id === id ? null : state.selectedTeam,
  })),
  
  selectTeam: (team) => set({ selectedTeam: team }),
  
  getTeamById: (id) => get().teams.find((team) => team.id === id),
}))

