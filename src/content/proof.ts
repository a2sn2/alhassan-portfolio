import { ProofContent } from "@/contracts/proof";

export const proofContent: ProofContent = {
  kicker: "05 / Verification & Trust",
  title: "Engineering Proof & Verification",
  description:
    "Direct source repositories, local code archives, verified certification records, and governed credentials.",
  status: "verified",
  items: [
    {
      id: "proof-project-sources",
      title: "Project Source Repositories & Archives",
      quote:
        "14 of 16 engineering systems backed by verified source code across standalone GitHub repositories and local source archives.",
      metric: "14 / 16 Source Backed",
      url: "/projects",
      type: "metric",
    },
    {
      id: "proof-credentials",
      title: "Credential Evidence Index",
      quote:
        "21 verified certificates with original PDFs, alongside structured tracking for ongoing technical programs.",
      metric: "21 Verified Certificates",
      url: "/capabilities",
      type: "certification",
    },
    {
      id: "proof-cv-package",
      title: "Official CV Package",
      quote:
        "Standardized multi-lingual CV packages available in German, English, and Arabic across Standard and ATS editions.",
      metric: "Trilingual (DE/EN/AR)",
      url: "/about",
      type: "publication",
    },
    {
      id: "proof-references",
      title: "Professional References",
      quote:
        "Academic and employment reference letters available on request in accordance with privacy and reference policies.",
      metric: "Available on Request",
      url: "/contact",
      type: "recommendation",
    },
  ],
};
