import {
  numeric,
  PgArray,
  pgTable,
  serial,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("created_at"),
  mockId: varchar("mockId").notNull(),
});
export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: text("mockId").notNull(),
  question: varchar("question").notNull(),
  feedback: text("feedback").notNull(),
  userAnswer: text("userAnswer").notNull(),
  areasOfImprovement: text("areasOfImprovement").notNull().array(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: timestamp("created_at"),
  rating: numeric("rating").notNull(),
});

