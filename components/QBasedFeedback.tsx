"use client";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { FeedBack } from "@/lib/types";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";


const QBasedFeedback = ({feedback}: {feedback: FeedBack[]}) => {
  
const [open, setOpen] = useState(-1);

  return (
    <div className=" space-y-4">
      {feedback.map((item, index) => (
        <Collapsible
          key={index}
          open={index === open}
          onOpenChange={() => setOpen(()=> index === open ? -1 : index)}
          
          className="w-full space-y-2"
        >
          <div className="flex items-center justify-between space-x-4 px-2">
            <h4 className="text-sm font-base line-clamp-3">
             {item.question}
            </h4>
            <CollapsibleTrigger asChild>
              <Button variant="ghost" size="sm" className="w-9 p-0 ">
                <ChevronsUpDown className="h-4 w-4 " />
                <span className="sr-only ">Toggle</span>
              </Button>
            </CollapsibleTrigger>
          </div>
          <div className={`rounded-md border ${Number(item.rating) <3 ? "border-red-400 bg-red-50 text-red-600" : "border-green-400 bg-green-50"} px-4 py-2 w-max text-sm`}>
            Rating : <span className="font-semibold">{item.rating}</span>
          </div>
          <CollapsibleContent className="space-y-2">
            <div className="rounded-md border px-4 py-3  border-blue-400 bg-blue-50  text-sm">
              <p>
                <span className="font-medium text-blue-500">Your Answer: </span>
               {item.userAnswer}
              </p>
            </div>
            <div className="rounded-md border px-4 py-3  border-yellow-400 bg-yellow-50  text-sm">
              <p>
                <span className="font-medium text-yellow-500">FeedBack: </span>
                {item.feedback}
              </p>
            </div>
            <div className="rounded-md border border-green-400 bg-green-50 px-4 py-3  text-sm">
              <span className="font-medium text-green-500">
                Areas of Improvement:{" "}
              </span>
              <ul className=" text-xs list-disc px-4">
                {item.areasOfImprovement?.map((item, index) => (
                <li key={index}>
                  {item}
                </li>
                    
                ))}
              </ul>
            </div>
          </CollapsibleContent>
        </Collapsible>
      ))}
    </div>
  );
};

export default QBasedFeedback;
