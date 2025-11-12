import { NextRequest, NextResponse } from "next/server";
import { GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "@/lib/s3";
import { randomUUID } from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { db } from "@/lib/db";
import { files } from "@/db/schema";
import { sql } from "drizzle-orm";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const name = formData.get("name") as string | null;
    const description = formData.get("description") as string | null;
    const file = formData.get("file") as File | null;

    if (!file || !name) {
      return NextResponse.json(
        { error: "Campos requeridos: name y file" },
        { status: 400 }
      );
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const key = `${randomUUID()}-${file.name}`;
    await s3.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: key,
        Body: buffer,
        ContentType: file.type,
      })
    );
    await db
      .insert(files)
      .values({
        name,
        description: description ?? null,
        fileType: file.type,
        key,
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json({
      key,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error guardando el archivo" },
      { status: 500 }
    );
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
      .from(files);
    const total = totalResult[0]?.count ?? 0;

    const data = await db
      .select()
      .from(files)
      .limit(limit)
      .offset(offset)
      .orderBy(files.id);

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
    console.error("Error obteniendo los archivos:", error);
    return NextResponse.json(
      { error: "Error obteniendo los archivos" },
      { status: 500 }
    );
  }
}