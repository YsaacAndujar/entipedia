"use client"
import dynamic from 'next/dynamic'
const Kanban = dynamic(() => import('../components/Kanban').then(m => m.Kanban), { ssr: false })

export const KanbanWrapper = () => {
  return (
      <Kanban />
  )
}
