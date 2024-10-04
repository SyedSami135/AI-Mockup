"use client";
import { Result } from "@/lib/types";
import db from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { useUser } from "@clerk/nextjs";
import { eq } from "drizzle-orm";
import { useEffect, useState } from "react";
import AddNewInterview from "./AddNewInterview";
import { Button } from "./ui/button";
import { useRouter } from "next/navigation";

const InterviewCards = () => {
  const [interViewCards, setInterViewCards] = useState<Result[]>([]);
  const { user } = useUser();
  const router= useRouter();

  const GetInterviewData = async () => {
    if (user) {
      const result = await db
        .select({
          jobPosition: MockInterview.jobPosition,
          jobDescription: MockInterview.jobDescription,
          createdAt: MockInterview.createdAt,
          mockId: MockInterview.mockId,
        })
        .from(MockInterview)
        .where(eq(MockInterview.createdBy, user.id));

      setInterViewCards(result);
    }
  };
 
  useEffect(() => {
    GetInterviewData();
  }, );
  return (
    <>
      {interViewCards.map((interview, index) => (
        <div
          key={index}
          className="border-2 p-4  gap-2 flex flex-col rounded-md hover:scale-95 transition-all  hover:shadow-lg"
        >
          <h2 className="font-semibold text-primary  w-full  text-base md:text-lg lg:text-xl">
            {interview.jobPosition}
          </h2>
          <p className="md:text-base line-clamp-2 text-sm ">
            {" "}
            <span className="text-primary font-medium">Description: </span>
            {interview.jobDescription}
          </p>
          <p className="text-sm text-muted w-full justify-end ">
            {" "}
            <span className="font-medium  text-muted ">Created At: </span>
            {interview.createdAt?.toDateString()}
          </p>
          <div className="flex justify-between mt-2 gap-3">

          <Button variant={"outline"} onClick={() => router.push(`/dashboard/interview/${interview.mockId}/feedback`)} className="w-full">Feedback</Button>
          <Button className="w-full" onClick={() => router.push(`/dashboard/interview/${interview.mockId}/`)}>Start</Button>
          </div>
        </div>
      ))}
      <AddNewInterview />
    </>
  );
};

export default InterviewCards;
