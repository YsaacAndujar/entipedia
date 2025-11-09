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