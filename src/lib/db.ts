import { projects } from '@/db/schema';
import { InferSelectModel } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DB,
});

export const db = drizzle(pool);
export { projects };

export type Project = InferSelectModel<typeof projects>;
