import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

export function getDaysUntil(date: string): number {
  const now = new Date()
  const target = new Date(date)
  const diff = target.getTime() - now.getTime()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function getStatusColor(status: string): string {
  const colors: Record<string, string> = {
    'completed': 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400',
    'in-progress': 'text-blue-600 bg-blue-50 dark:bg-blue-950 dark:text-blue-400',
    'todo': 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
    'review': 'text-purple-600 bg-purple-50 dark:bg-purple-950 dark:text-purple-400',
    'blocked': 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400',
    'on-hold': 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400',
    'planning': 'text-gray-600 bg-gray-50 dark:bg-gray-800 dark:text-gray-400',
  }
  return colors[status] || colors['todo']
}

export function getPriorityColor(priority: string): string {
  const colors: Record<string, string> = {
    'urgent': 'text-red-600 bg-red-50 dark:bg-red-950 dark:text-red-400',
    'high': 'text-orange-600 bg-orange-50 dark:bg-orange-950 dark:text-orange-400',
    'medium': 'text-yellow-600 bg-yellow-50 dark:bg-yellow-950 dark:text-yellow-400',
    'low': 'text-green-600 bg-green-50 dark:bg-green-950 dark:text-green-400',
  }
  return colors[priority] || colors['medium']
}

