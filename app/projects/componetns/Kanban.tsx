"use client"

import {
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import { projectStatuses } from '@/utils/project';


const projects = [
  {
    id: "1",
    name: "Landing Page Corporativa",
    description: "Diseño y desarrollo del sitio web público con información de la empresa.",
    status: "process",
    priority: "Alta",
    createdAt: "2025-11-05T14:32:00Z",
  },
  {
    id: "2",
    name: "API de Autenticación",
    description: "Implementar login, registro y recuperación de contraseña con JWT.",
    status: "new",
    priority: "Crítica",
    createdAt: "2025-11-06T10:12:00Z",
  },
  {
    id: "3",
    name: "Dashboard Administrativo",
    description: "Panel interno para gestionar usuarios, reportes y estadísticas.",
    status: "testing",
    priority: "Media",
    createdAt: "2025-11-07T09:15:00Z",
  },
  {
    id: "4",
    name: "Notificaciones Push",
    description: "Integrar notificaciones en tiempo real usando Firebase Cloud Messaging.",
    status: "completed",
    priority: "Baja",
    createdAt: "2025-11-03T22:45:00Z",
  },
  {
    id: "5",
    name: "Optimización de Base de Datos",
    description: "Revisión de índices y consultas lentas en PostgreSQL.",
    status: "process",
    priority: "Alta",
    createdAt: "2025-11-04T17:20:00Z",
  },
];
type Project = {
  id: string
  name: string
  description: string
  status: string
  priority: string
  createdAt: string
  column: string;
}

export const Kanban = () => {
    return (
        <KanbanProvider
            columns={projectStatuses}
            data={projects.map(project => ({...project, column:project.status}))}
            onDragEnd={(x)=>{console.log(x)}}
        >
            {(column) => (
                <KanbanBoard id={column.id} key={column.id}>
                    <KanbanHeader>
                        <div className="flex items-center gap-2">
                            <div
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: column.color }}
                            />
                            <span>{column.name}</span>
                        </div>
                    </KanbanHeader>
                    <KanbanCards id={column.id}>
                        {(project:Project) => (
                            <KanbanCard
                                column={column.id}
                                id={project.id}
                                key={project.id}
                                name={project.name}
                            >
                                <div className="flex flex-col gap-2">
                                    <p className="font-medium text-sm text-foreground">{project.name}</p>
                                    {project.description && (
                                        <p className="text-xs text-muted-foreground line-clamp-2">
                                            {project.description}
                                        </p>
                                    )}
                                    <div className="flex">
                                            <span
                                                key={project.priority}
                                                className="text-[11px] px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                                            >
                                                {project.priority}
                                            </span>
                                    </div>
                                    {project.createdAt && (
                                        <p className="text-[11px] text-muted-foreground mt-1">
                                            {new Date(project.createdAt).toISOString()}
                                        </p>
                                    )}
                                </div>
                            </KanbanCard>
                        )}
                    </KanbanCards>
                </KanbanBoard>
            )}
        </KanbanProvider>
    );
};
export default Kanban
