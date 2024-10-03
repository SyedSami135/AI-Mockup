import React from "react";
import { Button } from "./ui/button";
import Image from "next/image";

const Hero = () => {
  return (
    <header className="pt-20  bg-white text-center">
    
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


    </header>
  );
};

export default Hero;
