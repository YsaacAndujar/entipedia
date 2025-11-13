import { files } from "@/db/schema";
import { db } from "@/lib/db";
import { s3 } from "@/lib/s3";
import { DeleteObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { eq } from 'drizzle-orm';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  if (!id)
    return Response.json({ error: "Missing key" }, { status: 400 });
  const result = await db
    .select()
    .from(files)
    .where(eq(files.key, id))
    .limit(1)

  const file = result[0] ?? null
  const command = new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: id,
  });

  const signedUrl = await getSignedUrl(s3, command, { expiresIn: 3600 });

  return Response.json({ url: signedUrl, name: file?.name });
}


export async function DELETE(_: NextRequest, context: { params: Promise<{ id: string }> }) {
  const { id } = await context.params;
  try {
    const file = await db
      .select()
      .from(files)
      .where(eq(files.id, Number(id)))
      .limit(1)
      .then((r) => r[0]);

    if (!file) {
      return NextResponse.json({ error: "Archivo no encontrado" }, { status: 404 });
    }
    await s3.send(
      new DeleteObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME!,
        Key: file.key,
      })
    );
    await db.delete(files).where(eq(files.id, Number(id)));
    return new NextResponse(null, { status: 200 });
  } catch (error) {
    console.error("Error eliminando archivo:", error);
    return NextResponse.json(
      { error: "Error eliminando el archivo" },
      { status: 500 }
    );
  }
}