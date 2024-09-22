CREATE TABLE IF NOT EXISTS "comment" (
	"comment_id" serial PRIMARY KEY NOT NULL,
	"page" text NOT NULL,
	"name" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"message" text NOT NULL
);
