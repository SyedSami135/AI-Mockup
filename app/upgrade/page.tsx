"use client";
import { SetStateAction, useState } from "react";
import Image from "next/image";

const names = [
  {
    heading: "Basic",
    price: 5,
 
    button: "Start free trial",
    option: "Sed ut perspiciatis unde",
    category: "monthly",
    imgSrc: "/assets/pricing/starthree.svg",
  },
  {
    heading: "Plus",
    price: 10,
  
    button: "Start free trial",
    option: "Sed ut perspiciatis unde",
    category: "monthly",
    imgSrc: "/assets/pricing/starone.svg",
  },
];

const Pricing = () => {
  const [selectedCategory, setSelectedCategory] = useState("monthly");

  const handleCategoryChange = (category: SetStateAction<string>) => {
    setSelectedCategory(category);
  };

  const filteredData = names.filter(
    (item) => item.category === selectedCategory
  );

  return (
    <div id="pricing" className=" relative py-10">
      <div className="mx-auto max-w-7xl  lg:px-8 ">
        <h3 className="text-center text-4xl sm:text-65xl font-black">
          Our Pricing Plan.
        </h3>

       

        <div className="grid grid-cols-1 md:grid-cols-2 md:mx-40 items-center justify-center my-16 mx-5 gap-6">
          {filteredData.map((item, index) => (
            <div
              className="p-8 bg-white border border-blue-400 bxshd relative cursor-pointer hover:bg-blue-500 group"
              key={index}
            >
              <Image
                src={item.imgSrc}
                alt="star-image"
                width={154}
                height={154}
                className="absolute bottom-0 right-0"
              />
              <h4 className="text-4xl sm:text-5xl font-semibold mb-8 text-midnightblue group-hover:text-white">
                {item.heading}
              </h4>
              <button className="text-xl font-medium text-primary w-full bg-blue hover:text-white group-hover:bg-cornflowerblue group-hover:border-cornflowerblue border-2 border-blue rounded-full py-4 px-12 mb-8">
                {item.button}
              </button>
              <h2 className="text-4xl sm:text-5xl font-semibold text-midnightblue mb-3 group-hover:text-white">
                ${item.price}/<span className="text-lightgrey">mo</span>
              </h2>
             
              <p className="text-lg font-normal text-black opacity-40 mb-6 group-hover:text-white">
                (per subscriber per month)
              </p>

              <div className="flex gap-4">
                <Image
                  src="/assets/pricing/tick.svg"
                  alt="tick-image"
                  width={32}
                  height={32}
                />
                <p className="text-lg font-medium text-black opacity-60 group-hover:text-translucentwhite">
                  {item.option}
                </p>
              </div>
              <div className="flex gap-4 pt-6">
                <Image
                  src="/assets/pricing/tick.svg"
                  alt="tick-image"
                  width={32}
                  height={32}
                />
                <p className="text-lg font-medium text-black opacity-60 group-hover:text-translucentwhite">
                  {item.option}
                </p>
              </div>
              <div className="flex gap-4 pt-6">
                <Image
                  src="/assets/pricing/tick.svg"
                  alt="tick-image"
                  width={32}
                  height={32}
                />
                <p className="text-lg font-medium text-black opacity-60 group-hover:text-translucentwhite">
                  {item.option}
                </p>
              </div>
              <div className="flex gap-4 pt-6">
                <Image
                  src="/assets/pricing/tick.svg"
                  alt="tick-image"
                  width={32}
                  height={32}
                />
                <p className="text-lg font-medium text-black opacity-60 group-hover:text-translucentwhite">
                  {item.option}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
