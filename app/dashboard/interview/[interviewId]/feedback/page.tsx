"use client";
import OverAllFeedBack from "@/components/OverAllFeedBack";
import QBasedFeedback from "@/components/QBasedFeedback";
import { FeedBack } from "@/lib/types";
import db from "@/utils/db";
import { UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";

const FeedbackPage = ({params}:any) => {
  const [feedback, setFeedback] = useState<FeedBack[]>([]);
  useEffect(() => {
    FeedBackData();
  }, []);
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
          <QBasedFeedback  feedback={feedback}/>
        </div>
        <OverAllFeedBack rating={averageRating} />
      </div>
    </div>
  );
};

export default FeedbackPage;
