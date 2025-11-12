import { db, clients } from "@/lib/db";
import { clientsSchema } from "@/lib/validations";
import { sql } from "drizzle-orm";
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
        return NextResponse.json({ error: 'Error creando el cliente' }, { status: 400 });
    }
}

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const page = Number(searchParams.get("page")) || 1;
        const limit = Number(searchParams.get("limit")) || 10;
        const offset = (page - 1) * limit;

        const totalResult = await db
            .select({ count: sql<number>`count(*)` })
            .from(clients);
        const total = totalResult[0]?.count ?? 0;

        const data = await db
            .select()
            .from(clients)
            .limit(limit)
            .offset(offset)
            .orderBy(clients.id);

        return NextResponse.json({
            data,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        });
    } catch (error) {
        console.error("Error obteniendo clientes:", error);
        return NextResponse.json(
            { error: "Error obteniendo los clientes" },
            { status: 500 }
        );
    }
}