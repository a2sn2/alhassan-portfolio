import { ProjectCategory } from "@/contracts/projects";

export function formatProjectCategory(
  category: ProjectCategory,
  locale: "en" | "ar" | "de" | string = "en"
): string {
  if (locale === "de" || locale.startsWith("/de")) {
    switch (category) {
      case "All":
        return "Alle";
      case "Computer Vision & AI":
        return "Computer Vision & KI";
      case "Full-Stack & Web":
        return "Full-Stack & Web";
      case "Systems & Robotics":
        return "Systeme & Robotik";
      case "Embedded & IoT":
        return "Eingebettete Systeme & IoT";
      default:
        return category;
    }
  }

  if (locale === "ar" || locale.startsWith("/ar")) {
    switch (category) {
      case "All":
        return "الكل";
      case "Computer Vision & AI":
        return "الرؤية الحاسوبية والذكاء الاصطناعي";
      case "Full-Stack & Web":
        return "الويب والتطبيقات المتكاملة";
      case "Systems & Robotics":
        return "الأنظمة والروبوتات";
      case "Embedded & IoT":
        return "الأنظمة المدمجة وإنترنت الأشياء";
      default:
        return category;
    }
  }

  return category;
}
