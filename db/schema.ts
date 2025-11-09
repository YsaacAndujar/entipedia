import { pgEnum, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const ProjectStatus = pgEnum("project_status", ["new", "in_progress", "testing", "completed"]);
export const ProjectPriority = pgEnum("project_priority", ["low", "medium", "high", ]);

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  status: ProjectStatus("status").notNull(),
  priority: ProjectPriority("priority").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
