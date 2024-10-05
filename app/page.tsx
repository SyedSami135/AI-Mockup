import Brands from "@/components/Brands";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Newsletter from "@/components/NewsLetter";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between ">
      {/* Hero Section */}
      <Hero />
      <Brands/>
      {/* How it Works Section */}
      <Features />
      <div className=" w-full">
        <Newsletter />
      </div>
    </main>
  );
}
