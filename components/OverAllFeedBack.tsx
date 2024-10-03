import React from "react";
import StarRating from "./Stars";
import { FeedBack } from "@/lib/types";

const OverAllFeedBack = ({ rating }: { rating: number }) => {
 
  return (
    <div>

    <div className="border-2 flex-1 h-max border-blue-200 text-center items-center space-y-4 justify-center flex-col rounded-lg p-4">
      <h3 className="text-3xl font-semibold text-yellow-400 ">
        Overall FeedBack
      </h3>
      <span className="text-[7rem]"  >{ratingEmojis[Math.floor(rating)]} </span>
      <div className="items-center justify-center flex">
        <StarRating rating={rating} size={32} />
      </div>

      <p className="text-base text-center text-blue-400">
        {ratingMessages[rating]}
      </p>
    </div>
    <div className="bg-yellow-50 border border-yellow-400 p-4 rounded-lg  my-4">
      
      <p className="text-gray-700 mt-2 ">{motivationalQuotes[Math.floor(rating)]}</p>
    </div>

    </div>
  );
};

export default OverAllFeedBack;
const ratingEmojis: { [key: string]: string } = {
  "1": "😩", // Poor
  "2": "😐", // Okay
  "3": "😕", // Very Bad
  "4": "👍", // Good
  "5": "👏", // Clap
};
const ratingMessages: { [key: string]: string } = {
  "1": "Keep trying, improvement is possible!",
  "2": "You're on the right track, but there's room for growth.",
  "3": "Good effort! Focus on enhancing your skills.",
  "4": "Great job! Keep up the good work.",
  "5": "Excellent work! You're doing amazing!",
};
const motivationalQuotes: { [key: string]: string } = {
  "1": "Every failure is a step closer to success. Keep pushing forward!",
  "2": "You're doing okay, but don't settle for less. Strive for greatness!",
  "3": "Good effort! Keep practicing, and you'll get there!",
  "4": "Great job! Continue honing your skills and reaching new heights.",
  "5": "Amazing work! Your dedication and hard work are paying off!",
};
