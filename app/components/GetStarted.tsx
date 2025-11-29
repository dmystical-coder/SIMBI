import Link from "next/link";
import React from "react";

export default function GetStarted() {
  return (
    <section className="bg-white flex justify-center items-center h-fit py-14 lg:h-[43.3rem]">
      <div className="max-w-[358px] md:max-w-[580px] lg:max-w-[758px] p-2 space-y-4 text-center">
        <h2 className="text-xl md:text-2xl lg:text-5xl text-black font-semibold lg:font-medium">
          Study Smarter. Stay on track. Get Roasted (Lovingly)
        </h2>
        <p className="text-[#6B7280] text-xs md:text-lg lg:text-2xl">
          Sign up and get acquainted with Simbi!
        </p>
        <div className="flex flex-wrap justify-center gap-3 lg:gap-4 mt-4 lg:mt-14">
          <Link
            href="/get-started"
            className="w-[219px] bg-[#7A5FFF] text-white py-3 rounded-lg"
          >
            Get Started
          </Link>
          <Link
            href="/sign-in"
            className="w-[219px] border border-[#7A5FFF] text-[#7A5FFF] py-3 rounded-lg"
          >
            Have an Account{" "}
          </Link>{" "}
        </div>
      </div>
    </section>
  );
}
