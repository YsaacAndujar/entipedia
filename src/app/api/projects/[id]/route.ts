import { db, projects } from "@/lib/db";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try{
      await db.delete(projects).where(eq(projects.id, Number( id)));
      return new NextResponse(null, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: 'Error eliminando el proyecto'}, { status: 400 });
    }
}

