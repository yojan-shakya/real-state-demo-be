CREATE TABLE "agents" (
	"id" serial PRIMARY KEY NOT NULL,
	"email" varchar(50),
	"phone" varchar(12) NOT NULL,
	"name" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE "properties" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar NOT NULL,
	"description" varchar NOT NULL,
	"price" numeric(12, 2),
	"bedrooms" integer NOT NULL,
	"bathrooms" integer NOT NULL,
	"agent_id" integer,
	"suburb" varchar NOT NULL,
	"property_type" varchar NOT NULL,
	"internal_notes" varchar NOT NULL
);
--> statement-breakpoint
ALTER TABLE "properties" ADD CONSTRAINT "properties_agent_id_agents_id_fk" FOREIGN KEY ("agent_id") REFERENCES "public"."agents"("id") ON DELETE no action ON UPDATE no action;