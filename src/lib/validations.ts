import { ClientType, ProjectPriority, ProjectStatus } from "@/db/schema";
import { z } from "zod";

export const projectSchema = z.object({
    name: z.string("El nombre es obligatorio").min(1, "El nombre es obligatorio"),
    description: z.string("La descripción es obligatoria").min(1, "La descripción es obligatoria"),
    status: z.enum(ProjectStatus.enumValues, "Seleccione un estado"),
    priority: z.enum(ProjectPriority.enumValues, "Seleccione una prioridad"),
});

export type ProjectFormValues = z.infer<typeof projectSchema>

export const clientsSchema = z.object({
    name: z.string().min(1, "El nombre es obligatorio"),
    type: z.enum(ClientType.enumValues, "Seleccione un tipo válido"),
    value: z.coerce
        .number("El valor debe ser un número")
        .positive("El valor debe ser mayor que cero"),
    from: z
        .string("La fecha de inicio es obligatoria")
        .min(1, "La fecha de inicio es obligatoria"),
    to: z
        .string()
        .optional(),
})
    .refine(
        (data) => {
            if (!data.to) return true;
            const fromDate = new Date(data.from);
            const toDate = new Date(data.to);
            return toDate >= fromDate;
        },
        {
            message: "La fecha de finalización no puede ser menor que la fecha de inicio",
            path: ["to"],
        }
    );

export type ClientsFormValues = z.infer<typeof clientsSchema>