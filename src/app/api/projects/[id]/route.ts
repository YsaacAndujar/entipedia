import { ProjectStatus } from "@/db/schema";
import { db, projects } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";
import z from "zod";

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try{
      await db.delete(projects).where(eq(projects.id, Number( id)));
      return new NextResponse(null, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: 'Error eliminando el proyecto'}, { status: 400 });
    }
}

export async function PATCH(req: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;

  const schema = z.object({
    status: z.enum(ProjectStatus.enumValues, { message: "Seleccione un estado válido" }),
  });

  try {
    const body = await req.json();
    const parsed = schema.parse(body);

    await db
      .update(projects)
      .set({ status: parsed.status })
      .where(eq(projects.id, Number(id)));

    return new NextResponse(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.issues?.[0]?.message ?? "Datos inválidos";
      return NextResponse.json({ error: message }, { status: 400 });
    }
    return NextResponse.json({error: 'Error eliminando el proyecto'}, { status: 400 });
  }
}