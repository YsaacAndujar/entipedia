import { ProjectPriority, ProjectStatus } from "@/db/schema";
import { z } from "zod";

export const projectSchema = z.object({
    name: z.string("El nombre es obligatorio").min(1, "El nombre es obligatorio"),
    description: z.string("La descripción es obligatoria").min(1, "La descripción es obligatoria"),
    status: z.enum(ProjectStatus.enumValues, "Seleccione un estado"),
    priority: z.enum(ProjectPriority.enumValues, "Seleccione una prioridad"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>