"use client";
import QuestionsSection from "@/components/QuestionsSection";
import Record from "@/components/Record";

import { InterViewData, Questions } from "@/lib/types";
import db from "@/utils/db";
import { MockInterview, UserAnswer } from "@/utils/schema";
import { eq } from "drizzle-orm";
import { useRouter } from "next/navigation";

import { useEffect, useState } from "react";

const Interview = ({ params }: any) => {
  const [questions, setQuestions] = useState<Questions[]>([]);

  const [interviewData, setInterviewData] = useState<InterViewData[]>([]);
  const [activeQuestion, setActiveQuestion] = useState(1);
  const router = useRouter();
  useEffect(() => {
    GetInterviewData();
    GetAnswers();
  }, []);

 

  const GetAnswers = async () => {
    const result = await db
      .select({ userAnswer: UserAnswer.userAnswer })
      .from(UserAnswer)
      .where(eq(UserAnswer.mockIdRef, params.interviewId));
    setActiveQuestion(result.length);
  };

  const GetInterviewData = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    setInterviewData(result);
    const jsonMockResp = JSON.parse(result[0].jsonMockResp);
    setQuestions(jsonMockResp);
    
   
  };

  useEffect(() => {
    if (activeQuestion >= 5) {
      router.push(`/dashboard/interview/${params.interviewId}/feedback`);
    }
  })
  return (
    <>
      <div className=" mx-5 my-5 md:my-8  md:mx-10 ">
        <div className=" flex flex-col  space-y-8 justify-center ">
          <h2 className="font-semibold lg:font-bold  text-primary   text-2xl md:text-4xl text-center lg:text-5xl">
            Start Your Interview
          </h2>
          {interviewData.map((data) => (
            <div key={data.id} className="text-left    ">
              <h2 className="font-semibold lg:font-bold pb-1 text-lg md:text-2xl lg:text-4xl text-primary">
                {data.jobPosition}
              </h2>
              <p className=" line-clamp-2 md:line-clamp-1 lg:w-1/2 text-sm lg:text-base">
                {data.jobDescription}
              </p>
            </div>
          ))}
          <div className="grid  justify-center grid-cols-1 lg:grid-cols-2 gap-2">
            <div className=" items-center justify-center flex flex-col space-y-4">
              <QuestionsSection
                questions={questions}
                activeQuestion={activeQuestion}
              />
            </div>
            <div className="flex   flex-col w-full space-y-3 h-full ">
              <Record
                setActiveQuestion={setActiveQuestion}
                activeQuestionIndex={activeQuestion}
                interviewData={interviewData}
                questions={questions}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interview;
