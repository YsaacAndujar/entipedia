CREATE TYPE "public"."project_priority" AS ENUM('low', 'medium', 'high');--> statement-breakpoint
CREATE TYPE "public"."project_status" AS ENUM('new', 'in_progress', 'testing', 'completed');--> statement-breakpoint
CREATE TABLE "projects" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"status" "project_status" NOT NULL,
	"priority" "project_priority" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
