DO $$ BEGIN
 CREATE TYPE "public"."status" AS ENUM('notStarted', 'imProgress', 'completed');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "todo" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"status" "status" DEFAULT 'notStarted' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
