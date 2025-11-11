"use client"

import {
    KanbanBoard,
    KanbanCard,
    KanbanCards,
    KanbanHeader,
    KanbanItemProps,
    KanbanProvider,
} from '@/components/ui/shadcn-io/kanban';
import { useProjects } from '@/hooks/projects';
import { useDelete } from '@/hooks/useDelete';
import { Project } from '@/lib/db';
import { cn, formatDate, PRIORITY_LABELS, projectStatuses } from '@/lib/utils';
type ProjectKanbanItem = KanbanItemProps & Omit<Project, "id" | "createdAt"> & { createdAt: string };
export const Kanban = () => {
    const { data: projects, isLoading, error } = useProjects();
    const { mutate: deleteProject, isPending } = useDelete()
    console.log(isPending)
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
                                deleteModalProps={{ onDelete: () => deleteProject({ url: `/api/projects/${project.id}`, queryKey: ["projects"] }), isPending }}
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
                                    <div className="flex items-center justify-between mt-1">
                                        <p className="text-[11px] text-muted-foreground">
                                            {formatDate(project.createdAt)}
                                        </p>
                                    </div>
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
