import React from "react";
import Image from "next/image";

export default function RealTalk() {
  return (
    <section className="bg-white flex flex-wrap justify-center items-center h-[206px] md:h-[400px] lg:h-[506px] lg:gap-[90px] px-4 lg:px-0">
      <h2 className="lg:hidden text-xl md:text-3xl leading-[60px] text-dark-950 font-semibold">
        Real talk from Simbi
      </h2>
      <h2 className="hidden lg:block text-5xl leading-[60px] text-dark-950 font-medium">
        Real talk <br /> from <br /> Simbi
      </h2>

      <div className="rounded-[20px] shadow-[0px_16.66px_76.18px_rgba(149,127,255,0.53)] mb-4 lg:mb-0">
        <Image
          src="/real-talk-quote.webp"
          width={745}
          height={253}
          alt="simbi quote"
          className=""
        />
      </div>
    </section>
  );
}
