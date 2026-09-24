export type ProfileMediaVariant = "studio" | "formal";
export type SupportedLocale = "en" | "ar" | "de";

export interface ProfileMediaItem {
  src: string;
  width: number;
  height: number;
  aspectRatio: string;
  alt: Record<SupportedLocale, string>;
}

export const profileMedia: Record<ProfileMediaVariant, ProfileMediaItem> = {
  studio: {
    src: "/images/profile/alhassan-studio.png",
    width: 1254,
    height: 1254,
    aspectRatio: "1 / 1",
    alt: {
      en: "Professional studio portrait",
      ar: "صورة شخصية احترافية في الاستوديو",
      de: "Professionelles Studio-Porträt",
    },
  },
  formal: {
    src: "/images/profile/alhassan-formal.jpeg",
    width: 2400,
    height: 2814,
    aspectRatio: "2400 / 2814",
    alt: {
      en: "Formal professional portrait",
      ar: "صورة شخصية رسمية",
      de: "Formelles professionelles Porträt",
    },
  },
};

export function getProfileMedia(
  variant: ProfileMediaVariant,
  locale: SupportedLocale = "en"
) {
  const item = profileMedia[variant];
  return {
    src: item.src,
    width: item.width,
    height: item.height,
    aspectRatio: item.aspectRatio,
    alt: item.alt[locale] || item.alt.en,
  };
}
