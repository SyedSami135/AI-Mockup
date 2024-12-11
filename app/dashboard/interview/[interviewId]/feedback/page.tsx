"use client";
import OverAllFeedBack from "@/components/OverAllFeedBack";
import QBasedFeedback from "@/components/QBasedFeedback";
import { FeedBack } from "@/lib/types";
import db from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useState } from "react";

const FeedbackPage = ({ params }: any) => {
  const [feedback, setFeedback] = useState<FeedBack[]>([]);
  const [completed, setCompleted] = useState(false);

  const FeedBackData = async () => {
    const result = await db
      .select({
        UserAnswer: UserAnswer.userAnswer,
        rating: UserAnswer.rating,
        areasOfImprovement: UserAnswer.areasOfImprovement,
        feedback: UserAnswer.feedback,
        question: UserAnswer.question,
      })
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId))
      .orderBy(UserAnswer.id);
    const feedbackData = result.map((item) => ({
      userAnswer: item.UserAnswer,
      rating: item.rating,
      areasOfImprovement: item.areasOfImprovement,
      feedback: item.feedback,
      question: item.question,
    }));

    setFeedback(feedbackData);
  };

  async function fetchFeedback() {
    const completed = await db
      .select({ completed: MockInterview.completed })
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    return completed[0].completed;
  }

  fetchFeedback().then((completed) => {
    if (completed) {
      FeedBackData();
    }

    setCompleted(completed);
  });

  const calculateAverageRating = (data: FeedBack[]): number => {
    const totalRatings = data.reduce(
      (sum, item) => sum + Number(item.rating),
      0
    );
    const average = totalRatings / data.length;
    return isNaN(average) ? 0 : average; // Return 0 if no ratings are available
  };

  const averageRating = calculateAverageRating(feedback);

  return (
    <div>
      {completed ? (
        <div className="block mx-5 my-5 md:my-10  md:mx-20 ">
          <h2 className="font-bold text-green-500 text-2xl md:text-3xl lg:text-4xl">
            Congratulations{" "}
            <span className="text-3xl md:text-4xl lg:text-5xl">🥳</span>
          </h2>
          <p>
            Thank you for taking the time to prepare for your interview. Here is
            your feedback
          </p>
          <div className="flex lg:flex-row flex-col  justify-between mt-4 gap-4  ">
            <div className="border-2 lg:w-[60vw] border-yellow-200  rounded-lg p-4">
              <QBasedFeedback feedback={feedback} />
            </div>
            <OverAllFeedBack rating={averageRating} />
          </div>
        </div>
      ) : (
        <div className="block mx-5 my-5 md:my-10 py-10  md:mx-20 ">
          <h2 className="font-bold text-green-500 text-2xl md:text-3xl  lg:text-4xl">
            You have not completed the interview{" "}
          </h2>
          <p>
            Please complete the interview to get your feedback.{" "}
            <Link
              className="text-primary hover:underline tracking-wide font-light"
              href={`/dashboard/interview/${params.interviewId}/start`}
            >
              Complete Interview
            </Link>
          </p>
        </div>
      )}
    </div>
  );
};

export default FeedbackPage;
