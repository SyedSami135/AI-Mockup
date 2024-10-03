import { Questions } from "@/lib/types";
import { IconInfoSquare, IconVolume } from "@tabler/icons-react";
import React from "react";

interface QuestionComponentProps {
  // The function prop
  questions: Questions[];
  activeQuestion: number;
}
const QuestionsSection: React.FC<QuestionComponentProps> = ({
  questions,
  activeQuestion,
}) => {
  const playQuestion = () => {
    if ("speechSynthesis" in window) {
      const utterance = new SpeechSynthesisUtterance(
        questions[activeQuestion]?.question
      );
      speechSynthesis.speak(utterance);
    }
  };
  return (
    <div className="border-2 rounded-sm p-4 md:p-8 space-y-2 lg:space-y-6  flex flex-col">
      <div className=" grid grid-cols-3 h-full  w-full justify-start  md:grid-cols-4 items-center   min-w-full  gap-3 ">
        {questions.map((data, index) => (
          <h4
            key={index}
            // onClick={() => setActiveQuestion(index)}
            className={`cursor-pointer min-w-[90px] rounded-full ${
              activeQuestion === index
                ? "bg-primary text-white"
                : " bg-secondary"
            }    md:p-2 p-1 text-center  text-xs md:text-sm `}
          >
            Question #{index + 1}
          </h4>
        ))}
      </div>
      <h2 className=" text-base font-medium text-black  ">
        {questions[activeQuestion]?.question}
      </h2>

      <div className="flex justify-start w-full h-full">
        <IconVolume
          className="w-6 h-6 cursor-pointer text-primary "
          onClick={playQuestion}
        />
      </div>
      <div className=" rounded-sm p-2 md:p-4  mt-3 flex flex-col text-primary  bg-blue-100">
        <div className="flex space-x-2   items-center">
          <IconInfoSquare className="w-8 h-8 " stroke={1.5} />
          <h4 className="text-sm md:text-base  font-semibold">
            Interview Guidelines
          </h4>
        </div>
        <p className="line-clamp-2 md:line-clamp-3 text-xs pt-1 md:text-sm ">
          While answering, keep the Job Title and Job Description in mind.
          Tailor your responses to align with the role’s requirements and
          showcase relevant skills to move on to the next question.
        </p>
      </div>
    </div>
  );
};

export default QuestionsSection;
