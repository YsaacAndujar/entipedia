"use client"

import {
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanItemProps,
    KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import { useProjects } from '@/hooks/useProjects';
import { Project } from '@/lib/db';
import { cn, formatDate, PRIORITY_LABELS, projectStatuses } from '@/lib/utils';
type ProjectKanbanItem = KanbanItemProps & Omit<Project, "id" | "createdAt"> & {createdAt: string};
export const Kanban = () => {
    const { data: projects, isLoading, error } = useProjects();
    if (isLoading) return <p>Cargando proyectos...</p>;
    if (error) return <p>Error al cargar los proyectos.</p>;

    return (
        <KanbanProvider
            columns={projectStatuses}
            data={projects.map((project: Project) => ({ ...project, column: project.status, id: `${project.id}` }))}
            onDragEnd={(x) => { console.log(x) }}
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
                        {(project: ProjectKanbanItem) => (
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
                                            className={cn(
                                                "text-[11px] px-2 py-0.5 rounded-full font-medium",
                                                {
                                                    "bg-green-100 text-green-700 dark:bg-green-900/40 dark:text-green-300": project.priority === "low",
                                                    "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/40 dark:text-yellow-300": project.priority === "medium",
                                                    "bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-300": project.priority === "high",
                                                }
                                            )}
                                        >
                                            {PRIORITY_LABELS[project.priority]}
                                        </span>
                                    </div>
                                    {project.createdAt && (
                                        <p className="text-[11px] text-muted-foreground mt-1">
                                            {formatDate(project.createdAt)}
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
