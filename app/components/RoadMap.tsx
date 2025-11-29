import React from "react";
import Image from "next/image";
import { RoadMaps } from "../app-constants";

export default function RoadMap() {
  return (
    <section className="bg-[#E4DFFF]">
      <div className="flex flex-col place-items-center py-[30px] md:py-[50px] lg:py-[107px] lg:px-[174px]">
        <Image
          src="/simbi-black.svg"
          width={216}
          height={199}
          alt="simbi quote"
          className="w-[69px] h-[63px] md:w-40 md:h-[140px] lg:w-[216px] lg:h-[199px]"
        />
        <button
          type="button"
          className="w-[80vw] lg:w-[1089px] -mt-1 md:-mt-6 lg:-mt-6 bg-[#7A5FFF] text-white lg:text-3xl py-1 lg:py-3"
        >
          Get Started
        </button>
      </div>
      <div>
        <Image
          src="/road-map.png"
          width={1438}
          height={958}
          alt="simbi quote"
          className="w-full"
        />
      </div>
      <section className="py-[50px] lg:py-[107px] px-5 justify-center md:px-[52px] lg:px-[172px] flex gap-2.5 lg:gap-[53px] flex-wrap">
        {RoadMaps.map((item) => (
          <div
            key={item.id}
            className={`w-36 lg:w-[296px] h-[101px] lg:h-40 pt-[15px] lg:pt-[29px] p-5 lg:px-7 text-[10px] lg:text-2xl lg:leading-[22px] ${item.color} bg-white border border-[#1E1E2F] rounded-2xl shadow-[0px_16.66px_76.18px_rgba(149,127,255,0.53)]`}
          >
            {item.id}. {item.description}
          </div>
        ))}
      </section>
    </section>
  );
}
