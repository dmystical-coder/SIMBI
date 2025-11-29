import React from "react";
import { Offers } from "../app-constants";
import Image from "next/image";

export default function Herefor() {
  return (
    <div className="bg-white">
      <section className="flex py-[108px] flex-wrap lg:flex-nowrap justify-center px-11 gap-11">
        {Offers.map((item, index) => (
          <div
            className="w-[315px] rounded-[28px] shadow-[0px_16.66px_76.18px_rgba(149,127,255,0.53)]"
            key={index}
          >
            <Image
              src={item.img}
              width={315}
              height={47}
              alt={item.title}
              className="rounded-t-[28px]"
            />
            <div className="p-[21px] bg-white h-[146px] rounded-b-[28px]">
              <h4 className="text-[28px] text-black font-medium">
                {item.title}
              </h4>
              <p className="text-black text-sm">{item.subtitle}</p>
            </div>
          </div>
        ))}
      </section>
      <section className="hidden md:flex lg:flex justify-center h-[606px]">
        <div className="flex items-center gap-24">
          <Image
            src={"/here-for.webp"}
            width={245}
            height={475}
            alt="simbi icon"
            className="-mt-12"
          />
          <div className="max-w-[453px] p-2 space-y-4">
            <h2 className="text-5xl text-dark-950 font-medium">
              Simbi is here for
            </h2>

            <div className="space-y-2">
              <p className="text-[#6B7280] text-xl">
                Self-learners & exam preppers who want structure
              </p>
              <p className="text-[#6B7280] text-xl">
                Procrastinators who need a motivational kick
              </p>
              <p className="text-[#6B7280] text-xl">
                High school & university students tired of falling behindtay
                motivated and learn effectively with a touch of personality
              </p>
              <p className="text-[#6B7280] text-xl">
                Alt-learners blazing their own educational path
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
