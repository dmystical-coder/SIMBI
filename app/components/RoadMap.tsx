import Image from "next/image";
import Link from "next/link";
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
        <Link
          href="/get-started"
          className="block w-[95%] max-w-[700px] mt-5 lg:mt-8 mx-auto rounded-lg bg-[#8636EC] hover:bg-[#7A5FFF] active:bg-[#7A5FFF] transition-colors duration-150 text-white text-base md:text-lg lg:text-xl font-normal text-center py-4 lg:py-4 shadow-none outline-none border-none"
          style={{
            boxShadow: "0px 0px 0px 0px rgba(0,0,0,0)",
          }}
        >
          Get Started in 60 Seconds
        </Link>
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
