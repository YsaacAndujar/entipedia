import { db, clients } from "@/lib/db";
import { clientsSchema } from "@/lib/validations";
import { eq } from "drizzle-orm";
import { NextRequest, NextResponse } from "next/server";

export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try{
      await db.delete(clients).where(eq(clients.id, Number( id)));
      return new NextResponse(null, { status: 200 });
    } catch (error) {
        return NextResponse.json({error: 'Error eliminando el cliente'}, { status: 400 });
    }
}

export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
    try {
        const body = await req.json();
        const parsed = clientsSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: parsed.error.flatten().fieldErrors },
                { status: 400 }
            );
        }
        const data = parsed.data;
        const newClient = await db
            .update(clients)
            .set({
                ...data,
                value: data.value.toString(),
                from: data.from.split("T")[0],
                to: data.to ? data.to.split("T")[0] : null,
            })
            .where(eq(clients.id, Number(id)))
            .returning();
        return NextResponse.json(newClient);

    } catch (error) {
        return NextResponse.json({ error: 'Error actualizando el cliente' }, { status: 400 });
    }
}
