import { db, projects } from "@/lib/db";
import { projectSchema } from "@/lib/validations";
import { NextResponse } from "next/server";


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
        return NextResponse.json({error: 'Error eliminando el proyecto'}, { status: 400 });
    }

}

export async function GET() {
    const allProjects = await db.select().from(projects);
    return NextResponse.json(allProjects);
}