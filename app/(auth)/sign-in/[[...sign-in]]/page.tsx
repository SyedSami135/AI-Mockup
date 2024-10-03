import { SignIn } from "@clerk/nextjs";
import Image from "next/image";

export default function Page() {
  return (
   <div className="flex min-h-screen flex-col items-center justify-center ">
    <SignIn/>
   </div>
  );
}
