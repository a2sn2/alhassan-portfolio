import { ContactContent } from "@/contracts/contact";

export const contactContent = {
  kicker: "06 / Direct Connect",
  title: "Get In Touch",
  description: "Open for software engineering opportunities, architecture consultations, and technical collaborations.",
  methods: [
    {
      id: "github",
      label: "GitHub",
      value: "@a2sn2",
      href: "https://github.com/a2sn2",
      isPrimary: true,
      isExternal: true,
    },
  ],
  status: "placeholder",
  placeholderNotice: "[Awaiting verified professional email & LinkedIn link]",
  placeholderText: "Connect directly via verified public channels:",
} satisfies ContactContent;
