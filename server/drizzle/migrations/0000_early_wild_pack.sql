CREATE TABLE "merchant" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"hashed_password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"ifsc_code" varchar(11) NOT NULL,
	"merchant_id" varchar(16) NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL
);
