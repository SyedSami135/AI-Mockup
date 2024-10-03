"use client";
import { Button } from "@/components/ui/button";
import { InterViewData } from "@/lib/types";
import db from "@/utils/db";
import { MockInterview } from "@/utils/schema";
import { IconBulb, IconDeviceComputerCamera } from "@tabler/icons-react";
import { eq } from "drizzle-orm";
import Link from "next/link";
import { useEffect, useState } from "react";

const Interview = ({ params }: any) => {
  const [interviewData, setInterviewData] = useState<InterViewData[]>([]);


  useEffect(() => {
    GetInterviewData();
  }, []);

  const GetInterviewData = async () => {
    const result = await db
      .select()
      .from(MockInterview)
      .where(eq(MockInterview.mockId, params.interviewId));
    
    setInterviewData(result);
  };

  return (
    <>
      <div className=" mx-5 my-5 md:my-8  md:mx-10 ">
        <div className=" flex flex-col items-center space-y-8 justify-center ">
          <h2 className="font-semibold lg:font-bold   text-2xl md:text-4xl text-center lg:text-5xl">
            Let&apos;s Start
          </h2>
          <div className="grid  justify-center grid-cols-1 lg:grid-cols-2 gap-2">
            <div className=" items-center justify-center flex flex-col space-y-4">
              {interviewData.map((data) => (
                <div
                  key={data.id}
                  className="text-left border-2 rounded-sm w-full p-4 md:p-8  md:pr-10 space-y-3"
                >
                  <h2 className="font-semibold lg:font-bold  text-xl md:text-3xl lg:text-4xl text-primary">
                    {data.jobPosition}
                  </h2>
                  <p className=" line-clamp-2">{data.jobDescription}</p>

                  <p>
                    <strong>Experience: </strong> {data.jobExperience}
                  </p>
                  <p>
                    <strong>Time: </strong> {data.createdAt?.toDateString()}
                  </p>
                </div>
              ))}

              <div className="border-2 rounded-sm p-4 md:p-8  flex flex-col text-yellow-500  bg-yellow-100">
                <div className="flex space-x-3  items-center">
                  <IconBulb className="w-10 h-10 " stroke={1.5} />
                  <h4 className="text-lg md:text-xl  font-bold">
                    Interview Guidelines
                  </h4>
                </div>
                <p className="line-clamp-2 md:line-clamp-3 text-xs md:text-sm lg:text-base">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quae
                  pariatur sequi deleniti accusamus similique laborum aperiam
                </p>
              </div>
            </div>

            <div className="flex flex-col justify-center  items-center">
              <IconDeviceComputerCamera
                stroke={0.8}
                className=" min-w-[320px]   w-fit h-full  text-primary bg-secondary rounded-md p-8  cursor-pointer"
              />
              <Link href={`/dashboard/interview/${params.interviewId}/start`}>
                <Button
                  className="relative mt-2 text-primary hover:text-primary"
                  variant={"ghost"}
                >
                  Start interview
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Interview;
