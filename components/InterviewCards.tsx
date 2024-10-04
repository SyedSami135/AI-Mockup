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
import { IconDots, IconDotsCircleHorizontal, IconTrash } from "@tabler/icons-react";
import { Delete, DeleteIcon } from "lucide-react";
import { toast } from "sonner";

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

  const DeleteInterview = async (mockId: string) => {
    try {
      await db
       .delete(MockInterview)
       .where(eq(MockInterview.mockId, mockId));
      
       toast.success("Interview Deleted");
    } catch (error) {
      toast.error("Something went wrong");
    }   
  }
 
  useEffect(() => {
    GetInterviewData();
  }, );
  return (
    <>
      {interViewCards.map((interview, index) => (
        <div
          key={index} 
          
          className="border-2 p-4 relative  gap-2 flex flex-col rounded-md hover:scale-95 transition-all  hover:shadow-lg"
        >
          <Button variant={"ghost"} className="w-max h-max absolute top-2 hover:bg-red-50 right-2"
            onClick={() => DeleteInterview(interview.mockId)}
            > 
            <IconTrash className=" h-4 w-4 text-primary hover:text-red-500" />
            </Button>
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
