CREATE TABLE IF NOT EXISTS "cart" (
	"id" varchar PRIMARY KEY NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL,
	"user_id" varchar NOT NULL,
	"items" json
);

CREATE TABLE IF NOT EXISTS "users" (
	"id" varchar PRIMARY KEY NOT NULL,
	"first_name" text,
	"last_name" text,
	"user_name" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"image" varchar
);
