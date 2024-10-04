export type NavItemType = {
  name: string;
  path: string;
  onClick?: () => void;
};

export type InterViewData = {
  id: number; // 'serial' is typically a number (auto-incrementing primary key)
  jsonMockResp: string; // 'text' is a string in TypeScript
  jobPosition: string; // 'varchar' maps to string
  jobDescription: string; // 'varchar' maps to string
  jobExperience: string; // 'varchar' maps to string
  createdBy: string; // 'varchar' maps to string
  createdAt: Date | null; // 'timestamp' is represented as a Date object or can be null
  mockId: string; // 'varchar' maps to string
};

export type Result= {
  mockId: any;
  jobPosition: string;
  jobDescription: string;
  createdAt: Date | null;
}
export type Questions = {
  question: string; //
  answer: string; // =
};
export type FeedBack = {
  userAnswer: string;
  areasOfImprovement: string[] | null; // Allowing areasOfImprovement to be null
  feedback: string;
  rating: string; // Keep as string; if numerical, consider changing to number.
  question: string; // Keep as string; if numerical, consider changing to number.
};

export type MockInterviewType = {
  mockId: string; // UUID (string)
  createdAt: Date; // Date of creation
  jsonMockResp: string; // JSON response as a string
  jobDescription: string; // Job description (string)
  jobPosition: string; // Job title (string)
  jobExperience: number; // Years of experience (number)
  createdBy: string; // User ID of the creator (string)
};