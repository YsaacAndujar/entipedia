import { db, clients } from "@/lib/db";
import { clientsSchema } from "@/lib/validations";
import { NextResponse } from "next/server";


export async function POST(req: Request) {
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
            .insert(clients)
            .values({
                ...data,
                value: data.value.toString(),
                from: data.from.split("T")[0],
                to: data.to ? data.to.split("T")[0] : null,
            })
            .returning();
        return NextResponse.json(newClient);

    } catch (error) {
        return NextResponse.json({ error: 'Error eliminando el proyecto' }, { status: 400 });
    }
}

export async function GET() {
    const allClients = await db.select().from(clients);
    return NextResponse.json(allClients);
}