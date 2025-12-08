"use client";

import WelcomeSection from "./WelcomeSection";

interface SimbiPepTalkProps {
  message?: string;
}

export default function SimbiPepTalk({
  message = "Milestone soon! Did someone finally grow up?",
}: SimbiPepTalkProps) {
  return (
    <WelcomeSection
      title="Simbi's Pep talk"
      message={message}
      showCTA={false}
      backgroundColor="#E9E8FF"
      textColor="#27104E"
      characterImage="/images/simbi-waving.svg"
      characterPosition={{
        top: { base: "50%", md: "50%", lg: "50%" },
        right: { base: "20px", md: "30px", lg: "40px" },
      }}
      characterSize={{
        w: { base: "100px", md: "120px", lg: "140px" },
        h: { base: "140px", md: "160px", lg: "180px" },
      }}
    />
  );
}
