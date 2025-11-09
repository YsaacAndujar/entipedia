import { ProjectPriority, ProjectStatus } from "@/db/schema";
import { db, projects } from "@/lib/db";
import { NextResponse } from "next/server";
import { z } from "zod";

const projectSchema = z.object({
    name: z.string("El nombre es obligatorio").min(1, "El nombre es obligatorio"),
    description: z.string("La descripción es obligatoria").min(1, "La descripción es obligatoria"),
    status: z.enum(ProjectStatus.enumValues),
    priority: z.enum(ProjectPriority.enumValues),
});

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const parsed = projectSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }
        const data = parsed.data;
        const newProject = await db
            .insert(projects)
            .values({
                ...data,
            })
            .returning();
        return NextResponse.json(newProject);

    } catch (error) {
        console.log(error)
        return NextResponse.json(error, { status: 400 });
    }

}

export async function GET() {
    const allProjects = await db.select().from(projects);
    return NextResponse.json(allProjects);
}