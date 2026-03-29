ALTER TABLE "properties" ALTER COLUMN "price" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "properties" ADD COLUMN "land_size" integer NOT NULL;