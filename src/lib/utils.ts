import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const PRIORITY_LABELS: Record<string, string> = {
  low: "Baja",
  medium: "Media",
  high: "Alta",
};

export const PROJECT_STATUS_LABELS: Record<string, string> = {
  new: "Nuevo",
  in_progress: "En proceso",
  completed: "Completado",
  testing: "Testing",
};

export const projectStatuses = [
  { id: 'new', name: 'Nuevo', color: '#3B82F6' },
  { id: 'in_progress', name: 'En proceso', color: '#F59E0B' },
  { id: 'testing', name: 'Testing', color: '#EAB308' },
  { id: 'completed', name: 'Completado', color: '#10B981' },
];

export const formatDate = (date: string | Date ) =>(new Date(date).toLocaleString("es-DO", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: true,
}))