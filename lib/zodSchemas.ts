"use client";

import { z } from "zod";

export const formSchema = z.object({
  jobTitle: z.string().min(2).max(50),
  jobDescription: z.string().min(50).max(4000),
  yearsOfExperience: z.coerce.number().nonnegative().min(1, "Years of experience must be at least 1")
});
