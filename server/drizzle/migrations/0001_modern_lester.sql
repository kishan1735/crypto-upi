CREATE TYPE "public"."bank_enum" AS ENUM('HDFC', 'ICICI', 'SBI');--> statement-breakpoint
CREATE TABLE "bank" (
	"ifscCode" text PRIMARY KEY NOT NULL,
	"name" "bank_enum" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" text PRIMARY KEY NOT NULL,
	"name" text NOT NULL,
	"hashed_password" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"bank" text NOT NULL,
	"amount" integer DEFAULT 0 NOT NULL,
	"pin" varchar(16) NOT NULL,
	"mmid" text NOT NULL,
	"phone_number" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "merchant" ADD COLUMN "bank" text NOT NULL;--> statement-breakpoint
ALTER TABLE "user" ADD CONSTRAINT "user_bank_bank_ifscCode_fk" FOREIGN KEY ("bank") REFERENCES "public"."bank"("ifscCode") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "merchant" ADD CONSTRAINT "merchant_bank_bank_ifscCode_fk" FOREIGN KEY ("bank") REFERENCES "public"."bank"("ifscCode") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "merchant" DROP COLUMN "ifsc_code";