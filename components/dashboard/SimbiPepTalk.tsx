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
      characterSize={{
        w: { base: "90px", md: "100px", lg: "120px" },
        h: { base: "110px", md: "140px", lg: "160px" },
      }}
      titleFontSize={{ base: "18px", md: "22px", lg: "24px" }}
      messageFontSize={{ base: "13px", md: "15px", lg: "16px" }}
      mt="0"
      maxW="100%"
      minH="auto"
      p={{ base: "20px", md: "24px" }}
      imageLayout="inline"
    />
  );
}
