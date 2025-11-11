CREATE TYPE "public"."client_type" AS ENUM('person', 'company');--> statement-breakpoint
CREATE TABLE "clients" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"type" "client_type" NOT NULL,
	"value" numeric(12, 2) NOT NULL,
	"from" date NOT NULL,
	"to" date
);
