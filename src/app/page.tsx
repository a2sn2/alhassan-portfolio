import React from "react";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProofSection } from "@/components/sections/ProofSection";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  identityContent,
  aboutContent,
  experienceContent,
  projectsContent,
  skillsContent,
  proofContent,
  contactContent,
} from "@/content";

export default function Home() {
  return (
    <>
      <HeroSection content={identityContent} />
      <AboutSection content={aboutContent} />
      <ExperienceSection content={experienceContent} />
      <ProjectsSection content={projectsContent} />
      <SkillsSection content={skillsContent} />
      <ProofSection content={proofContent} />
      <ContactSection content={contactContent} />
    </>
  );
}
