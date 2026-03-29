CREATE TYPE "public"."property_type_enum" AS ENUM('APARTMENT', 'HOUSE', 'VILLA', 'OFFICE', 'LAND');--> statement-breakpoint
CREATE TYPE "public"."internal_property_status_enum" AS ENUM('fraud_suspected', 'approved', 'rejected', 'under_review');--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price" numeric(12, 2),
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"agent_id" integer,
	"suburb" varchar NOT NULL,
	"property_type" "property_type_enum" NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "property_admin_meta" (
	"id" serial PRIMARY KEY NOT NULL,
	"property_id" integer,
	"internal_status" "internal_property_status_enum" DEFAULT 'under_review',
	"risk_score" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "agents" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(50),
	"phone" varchar(12) NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "property_admin_meta" ADD CONSTRAINT "property_admin_meta_property_id_properties_id_fk" FOREIGN KEY ("property_id") REFERENCES "public"."properties"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
CREATE INDEX "idx_property_price" ON "properties" USING btree ("price");--> statement-breakpoint
CREATE INDEX "idx_property_type" ON "properties" USING btree ("property_type");--> statement-breakpoint
CREATE INDEX "idx_property_suburbs" ON "properties" USING btree ("suburb");--> statement-breakpoint
CREATE INDEX "idx_property_updatedAt" ON "properties" USING btree ("updated_at");