CREATE TABLE IF NOT EXISTS "mockInterview" (
	"id" serial PRIMARY KEY NOT NULL,
	"jsonMockResp" text NOT NULL,
	"jobPosition" varchar NOT NULL,
	"jobDescription" varchar NOT NULL,
	"jobExperience" varchar NOT NULL,
	"createdBy" varchar NOT NULL,
	"created_at" timestamp,
	"completed" boolean DEFAULT false NOT NULL,
	"mockId" varchar NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "userAnswer" (
	"id" serial PRIMARY KEY NOT NULL,
	"mockId" text NOT NULL,
	"question" varchar NOT NULL,
	"feedback" text NOT NULL,
	"userAnswer" text NOT NULL,
	"areasOfImprovement" text[],
	"createdBy" varchar NOT NULL,
	"created_at" timestamp,
	"rating" numeric NOT NULL
);
