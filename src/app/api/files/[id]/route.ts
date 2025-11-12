import { eq } from 'drizzle-orm';
import { files } from "@/db/schema";
import { db } from "@/lib/db";
import { s3 } from "@/lib/s3";
import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function GET(_: Request, context: { params: Promise<{ id: string }> }) {
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