import React from "react";
import { Whys } from "../app-constants";
import Image from "next/image";

export default function Why() {
  return (
    <section className="bg-[#E4DFFF] flex flex-col justify-center items-center h-fit lg:h-screen">
      <h2 className="text-2xl md:text-4xl lg:text-5xl text-dark-950 font-semibold lg:font-medium text-center mt-10 lg:mt-0">Why Simbi works</h2>
      <section className="w-full flex flex-wrap py-[30px] justify-center! items-center! md:py-16 lg:py-[108px] px-6 lg:px-11 gap-3 md:gap-8 lg:gap-11">
        {Whys.map((item, index) => (
          <div
            className="w-[136px] md:w-[262px] lg:w-[262px] bg-white h-[190px] md:h-[290px] lg:h-[330px] rounded-[28px] flex flex-col place-items-center text-center gap-2 py-[20px] md:py-[47px] lg:py-[47px] shadow-[0px_16.66px_76.18px_rgba(149,127,255,0.53)]"
            key={index}
          >
            <Image
              src={item.img}
              width={79}
              height={67}
              alt={item.title}
              className="rounded-t-[28px] w-8 h-7 md:w-[79px] md:h-[67px] lg:w-[79px] lg:h-[67px]"
            />
            <div className="p-2.5 md:p-[21px] lg:p-[21px] rounded-b-[28px] space-y-2 md:space-y-3 lg:space-y-3">
              <h4
                className={`text-xs md:text-2xl lg:text-2xl font-medium ${item.color}`}
              >
                {item.title}
              </h4>
              <p className="text-black text-[10px] md:text-sm lg:text-sm">
                {item.subtitle}
              </p>
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}
