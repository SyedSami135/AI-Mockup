import { InterViewData, Questions } from "@/lib/types";
import db from "@/utils/db";
import { model } from "@/utils/GeminiAiModel";
import { UserAnswer } from "@/utils/schema";
import { IconDeviceComputerCamera, IconMicrophone } from "@tabler/icons-react";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { toast } from "sonner";
import { Button } from "./ui/button";
import WebcamComponent from "./WebCam";
// import "regenerator-runtime/runtime";

interface QuestionComponentProps {
  setActiveQuestion: React.Dispatch<React.SetStateAction<number>>; // The function prop
  questions: Questions[];
  interviewData: InterViewData[];
  activeQuestionIndex: number;
}
const Record = ({
  setActiveQuestion,
  questions,
  interviewData,
  activeQuestionIndex,
}: QuestionComponentProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  useEffect(() => {
    if (!browserSupportsSpeechRecognition) {
      <p className="text-red-400 text-center p-2 text-sm border-2 border-red-300 rounded-sm ">
        Web Speech API is not available in this browser Please Use Laptop Or
        Computer to continue <span className="text-xl">🤷‍</span>
      </p>;
    }
  }, [browserSupportsSpeechRecognition]);

  const SaveAnswer = async () => {
    setIsLoading(true);
    if (transcript.length < 10) {
      toast.error(
        "Some thing went Wrong While Recording your answer please try again"
      );
      setIsLoading(false);
      return;
    }

    let prompt = `Generate feedback and rating for the  Answer="${transcript}" to a question="${questions[activeQuestionIndex]?.question}" based on the Job Title: "${interviewData[0]?.jobPosition}" and Job Description: "${interviewData[0]?.jobDescription}" for an interviewee having ${interviewData[0]?.jobExperience} years of experience in this field. Provide feedback on relevance to the job description, depth of understanding, clarity, and fit for the role. Rate the answer on a scale of 1 to 5. Note that the answer was recorded by the user's device and may be a bit anonymized, disrupted, or unclear due to recording quality. Provide areas for improvement as an array of suggestions. Use the following JSON schema:

        {
          "type": "object",
          "properties": {
          
            "feedback": {
              "type": "string",
              "description": "A summary of the overall feedback on the answer, including its relevance, depth of understanding, clarity, and fit for the role"
            },
            "areasOfImprovement": {
              "type": "array",
              "items": {
                "type": "string",
                "description": "A specific suggestion on how the interviewee could improve their response"
              },
              "description": "An array of suggestions for improvement"
            },
            "rating": {
              "type": "number",
              "description": "Rating of the answer on a scale of 1 to 5"
            }
          },
          "required": ["feedback", "areasOfImprovement", "rating"],
          "additionalProperties": false
        }
        `;

    const result = await model.generateContent(prompt);
    const feedbackResponse = await JSON.parse(result.response.text());

    const resp = await db.insert(UserAnswer).values({
      userAnswer: transcript,
      question: questions[activeQuestionIndex].question,
      createdBy: interviewData[0].createdBy,
      createdAt: new Date(),
      feedback: feedbackResponse?.feedback,
      mockIdRef: interviewData[0].mockId,
      areasOfImprovement: feedbackResponse?.areasOfImprovement,
      rating: feedbackResponse?.rating,
    });
    if (!resp) {
      toast.error("Something Went Wrong");
      return;
    }
    toast.success("Answer Recorded Successfully");
    setActiveQuestion(activeQuestionIndex + 1);
    console.log(transcript);
    resetTranscript();

    setIsLoading(false);
  };

  const RecordUserAnswer = async () => {
    if (listening) {
      SaveAnswer();
      setTimeout(() => SpeechRecognition.stopListening(), 1000);
    } else {
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="flex  h-full justify-center  w-full ">
      <>
        <div className="flex flex-col justify-center  items-center">
          {listening ? (
            <WebcamComponent />
          ) : (
            <IconDeviceComputerCamera
              stroke={0.8}
              className=" min-w-[320px]  md:min-w-[640px] lg:min-w-full w-full h-full  text-primary bg-secondary rounded-md p-8  cursor-pointer"
            />
          )}
          {activeQuestionIndex >= questions.length ? (
            <>
              <Button
                onClick={() =>
                  router.push(
                    `/dashboard/interview/${interviewData[0].mockId}/feedback`
                  )
                }
                className="relative mt-4 text-white text-base "
              >
                End Interview
              </Button>
            </>
          ) : (
            <>
              <Button
                className="relative mt-2 text-primary "
                onClick={RecordUserAnswer}
                variant={"ghost"}
              >
                {listening ? (
                  <>
                    <div className="flex space-x-1 items-center">
                      <IconMicrophone className="w-6 text-red-400 h-6" />{" "}
                      <span className="text-red-400  ">Stop Recording </span>
                    </div>
                  </>
                ) : isLoading ? (
                  <div className="flex gap-2 text-primary items-center">
                    Loading ...
                    <Loader2 className="w-6 h-6 animate-spin text-primary/80 " />
                  </div>
                ) : (
                  <span className="text-primary">Start Recording</span>
                )}
              </Button>
            </>
          )}
        </div>
      </>
    </div>
  );
};

export default Record;
