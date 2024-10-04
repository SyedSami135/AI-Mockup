"use client"
import Image from "next/image";
import Slider from "react-slick";
import Marquee from "react-fast-marquee";
// IMAGES DATA FOR CAROUSEL
interface Data {
    imgSrc: string;
}

const data: Data[] = [
    {
        imgSrc: "/assets/carousel/airbnb.svg"
    },
    {
        imgSrc: "/assets/carousel/fedex.svg"
    },
    {
        imgSrc: "/assets/carousel/google.svg"
    },
    {
        imgSrc: "/assets/carousel/hubspot.svg"
    },
    {
        imgSrc: "/assets/carousel/microsoft.svg"
    },
    {
        imgSrc: "/assets/carousel/walmart.svg"
    },
    {
        imgSrc: "/assets/carousel/airbnb.svg"
    },
    {
        imgSrc: "/assets/carousel/fedex.svg"
    }
]



const Brands = () => {
    return (

        <div className='text-center w-full my-10'>
            <div className="mx-auto w-full px-4 sm:px-6 lg:max-w-7xl lg:px-8">
                <h2 className="text-black text-2xl font-semibold">Trusted by companies of all sizes</h2>
                <div className="py-14">
                    <Marquee className=" w-full overflow-hidden" >
                        {data.map((item, i) =>
                            <div key={i} className="px-20 mt-5">
                                <Image src={item.imgSrc} alt={item.imgSrc} width={126} height={40} className="" />
                               
                            </div>
                        )}
                    </Marquee>
                </div>
              
            </div>
        </div>

    )
}

export default Brands

       
