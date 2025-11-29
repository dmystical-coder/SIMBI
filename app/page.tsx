"use client";

import Image from "next/image";
import Header from "./components/Header";
import Section from "./components/Section";
import Herefor from "./components/Herefor";
import Why from "./components/Why";
import RealTalk from "./components/RealTalk";
import RoadMap from "./components/RoadMap";
import GetStarted from "./components/GetStarted";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <div>
      <section>
        <Header />
      </section>
      <main>
        <Section>
          <Herefor />
        </Section>
        <Section>
          <Why />
        </Section>
        <Section>
          <RealTalk />
        </Section>
        <Section>
          <RoadMap />
        </Section>
        <Section>
          <GetStarted />
        </Section>
        <Section>
          <Footer />
        </Section>
      </main>
    </div>
  );
}
