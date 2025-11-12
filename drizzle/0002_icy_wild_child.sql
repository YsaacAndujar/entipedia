CREATE TABLE "files" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"file_type" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
