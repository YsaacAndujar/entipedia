import { date, numeric, pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const ProjectStatus = pgEnum("project_status", ["new", "in_progress", "testing", "completed"]);
export const ProjectPriority = pgEnum("project_priority", ["low", "medium", "high",]);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  status: ProjectStatus("status").notNull(),
  priority: ProjectPriority("priority").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const ClientType = pgEnum("client_type", ["person", "company"]);

export const clients = pgTable("clients", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: ClientType("type").notNull(),
  value: numeric("value", { precision: 12, scale: 2 }).notNull(),
  from: date("from").notNull(),
  to: date("to"),
});