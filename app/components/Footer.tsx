import React from "react";
import Image from "next/image";
import { footerIcons } from "../app-constants";

export default function Footer() {
  return (
    <section className="bg-[#E4DFFF] px-8 lg:px-20 py-12 grid gap-3 md:grid-cols-3 lg:grid-cols-4 pb-18 lg:pb-40">
      <div className="flex items-center gap-2 -mt-10">
        <Image src={"/logo.svg"} width={50} height={41} alt="logo" />
        <h1 className="text-[50px] lg:text-[63px] font-bold text-dark-950">Simbi</h1>
      </div>
      <div>
        <h3>Company</h3>
        <ul className="text-[#525252] mt-1.5 lg:mt-3">
          <li>About</li>
          <li>Careers</li>
          <li>Press</li>
        </ul>
      </div>
      <div>
        <h3>Resources</h3>
        <ul className="text-[#525252] mt-1.5 lg:mt-3">
          <li>Blog</li>
          <li>Help center</li>
          <li>Tutorials</li>
        </ul>
      </div>
      <div>
        <h3>Connect</h3>
        <span className="flex gap-2 mt-1.5 lg:mt-3">
          {footerIcons.map((item, index) => (
            <div key={index}>{item.icons}</div>
          ))}
        </span>
      </div>
    </section>
  );
}
