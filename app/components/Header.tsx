import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <section>
      <nav className="flex justify-between px-5 py-2.5 lg:px-36 lg:py-8 items-center bg-white">
        <div className="flex items-center gap-2">
          <Image src={"/logo.svg"} width={50} height={41} alt="logo" />
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-dark-950">
            Simbi
          </h1>
        </div>
        <div className="border border-[#C9C0D4] rounded-2xl lg:rounded-xl w-[140px] md:w-[306px] lg:w-[346px] flex justify-between items-center px-2.5 py-1 md:p-4 lg:p-4">
          <p>Language</p>
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M6 9l6 6 6-6" />
          </svg>
        </div>
      </nav>
      <section className="bg-[#E9E8FF] flex justify-center items-center h-[455px] md:h-[43.3rem] lg:h-[43.3rem]">
        <div className="flex flex-wrap-reverse justify-center items-center md:gap-20 lg:gap-24 px-10 md:px-6 lg:px-0">
          <Image
            src={"/hero-image.webp"}
            width={245}
            height={389}
            alt="simbi icon"
            className="w-[95px] h-[150px] md:w-[205px] md:h-[348px] lg:w-[245px] lg:h-[398px]"
          />
          <div className="max-w-[532px] p-2 space-y-4 text-center">
            <h2 className="text-xl md:text-4xl lg:text-5xl text-dark-950 font-semibold">
              Meet Simbi! <br /> Your Ai Study Buddy.
            </h2>
            <p className="text-[#6B7280] text-sm md:text-xl lg:text-2xl">
              Simbi helps you plan, stay motivated and learn effectively with a
              touch of personality
            </p>
            <div className="space-y-4 mt-2 md:mt-10 lg:mt-12 flex flex-col items-center md:items-start">
              <Link
                href="/get-started"
                className="w-[233px] lg:w-[444px] bg-[#7A5FFF] text-white py-3 text-center block"
              >
                Get Started
              </Link>
              <Link
                href="/sign-in"
                className="w-[233px] lg:w-[444px] border border-[#7A5FFF] text-[#7A5FFF] py-3 rounded-lg text-center block"
              >
                Have an Account{" "}
              </Link>{" "}
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}