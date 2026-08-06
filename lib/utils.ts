import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Parses date string in "yyyy-MM-dd HH:mm:ss", "yyyy-MM-dd" or standard Date formats.
 */
export function parseCustomDate(dateInput: string | Date): Date {
  if (dateInput instanceof Date) return dateInput
  if (!dateInput) return new Date(NaN)

  const trimmed = dateInput.trim()
  // Handles "yyyy-MM-dd HH:mm:ss" -> "yyyy-MM-ddTHH:mm:ss"
  const formattedStr = trimmed.includes(' ') ? trimmed.replace(' ', 'T') : trimmed
  return new Date(formattedStr)
}

/**
 * Formats "yyyy-MM-dd HH:mm:ss" or Date object into "dd/MM/yyyy".
 */
export function formatDate(dateInput: string | Date): string {
  const date = parseCustomDate(dateInput)
  if (isNaN(date.getTime())) {
    return typeof dateInput === 'string' ? dateInput : ''
  }

  const day = String(date.getDate()).padStart(2, '0')
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const year = date.getFullYear()

  return `${day}/${month}/${year}`
}

/**
 * Calculates relative time elapsed from publication date to current date.
 * Output examples: "8 min", "2 dias", "3 meses", "1 ano"
 */
export function getRelativeTime(dateInput: string | Date): string {
  const date = parseCustomDate(dateInput)
  if (isNaN(date.getTime())) {
    return typeof dateInput === 'string' ? dateInput : ''
  }

  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return 'agora mesmo'
  }

  const diffInMinutes = Math.floor(diffInSeconds / 60)
  if (diffInMinutes < 60) {
    return `${diffInMinutes} min`
  }

  const diffInHours = Math.floor(diffInMinutes / 60)
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hora' : 'horas'}`
  }

  const diffInDays = Math.floor(diffInHours / 24)
  if (diffInDays < 30) {
    return `${diffInDays} ${diffInDays === 1 ? 'dia' : 'dias'}`
  }

  const diffInMonths = Math.floor(diffInDays / 30)
  if (diffInMonths < 12) {
    return `${diffInMonths} ${diffInMonths === 1 ? 'mês' : 'meses'}`
  }

  const diffInYears = Math.floor(diffInDays / 365)
  return `${diffInYears} ${diffInYears === 1 ? 'ano' : 'anos'}`
}


