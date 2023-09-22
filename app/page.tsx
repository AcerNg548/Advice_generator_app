"use client";

import Image from "next/image";
import divider from "@/public/images/pattern-divider-desktop.svg";
import dividerM from "@/public/images/pattern-divider-mobile.svg";
import dice from "@/public/images/icon-dice.svg";
import { useEffect, useState } from "react";
import axios from "axios";

interface Advice {
  id: number;
  advice: string;
}

const page = () => {
  const [advice, setAdvice] = useState<Advice>({ id: 0, advice: "" });

  const getAdvice = async () => {
    const response = await axios.get("https://api.adviceslip.com/advice");
    const advice = await response.data.slip;
    setAdvice(advice);
  };

  useEffect(() => {
    getAdvice();
  }, []);
  return (
    <div
      className="w-screen h-screen bg-DarkBlue flex items-center justify-center
    mobile:px-3 mobileBig:px-6
    "
    >
      <div
        className="w-[30%] p-6 bg-DarkGrayishBlue rounded-xl flex flex-col items-center gap-4 text-center relative
      mobile:w-full mobileBig:w-full 
      "
      >
        <p className="uppercase text-[12px] text-NeonGreen tracking-[4px]">
          Advice #{advice.id}
        </p>
        <p className="text-[28px] text-LightCyan ">"{advice.advice}"</p>
        <Image
          src={divider}
          alt="divider"
          className="mb-10 mobile:hidden mobileBig:hidden"
        />
        <Image src={dividerM} alt="divider" className="mb-10 desktop:hidden" />
        <div
          className="absolute group -bottom-8 cursor-pointer"
          onClick={getAdvice}
        >
          <div className=" w-16 h-16 bg-NeonGreen flex items-center justify-center rounded-full z-20 relative ">
            <Image src={dice} alt="random" priority />
          </div>
          <div
            className=" w-16 h-16 bg-NeonGreen flex items-center justify-center rounded-full z-10  opacity-0
          blur-lg group-hover:opacity-100 absolute bottom-0
          "
          >
            <Image src={dice} alt="random" priority />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
