import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="w-full  bg-white text-center">
      <div className="h-[90vh] w-full dark:bg-black bg-white  dark:bg-grid-white/[0.2] bg-grid-black/[0.1] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center dark:bg-black bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <h1 className="text-3xl md:text-5xl   font-bold text-gray-800 mb-4">
        Your Personal AI Interview Coach
      </h1>
      <p className="text-gray-600 max-w-xl mx-auto mb-6">
        Double your chances of landing that job offer with our AI-powered
        interview prep.
      </p>
      <Button className="bg-primary/90 text-white p-6 text-base rounded-md my-8 hover:bg-primary" size={"lg"}>
        Get Started
      </Button>



    </div>
    
      
     
    </header>
  );
};

export default Hero;
