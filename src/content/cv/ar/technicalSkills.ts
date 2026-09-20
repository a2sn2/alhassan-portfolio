/**
 * Canonical Arabic Standard CV Digital Skills (المهارات الرقمية)
 *
 * Source: docs/ALHassan_Baligh_ALShami_CV_Package/العربية/السيرة الذاتية - الحسن بليغ الشامي - النسخة العادية.pdf (Page 2)
 */
export interface CanonicalSkillGroupLineAr {
  id: string;
  officialLine: string;
  atomicSkills: string[];
}

export const canonicalTechnicalSkillLinesAr: CanonicalSkillGroupLineAr[] = [
  {
    id: "flutter-android",
    officialLine: "Dart/Flutter, Android Studio",
    atomicSkills: ["Dart", "Flutter", "Android Studio"],
  },
  {
    id: "python-web",
    officialLine: "Python, HTML/CSS/JS",
    atomicSkills: ["Python", "HTML", "CSS", "JS"],
  },
  {
    id: "compiled-languages",
    officialLine: "C/C++ Java",
    atomicSkills: ["C", "C++", "Java"],
  },
  {
    id: "databases",
    officialLine: "قواعد البيانات",
    atomicSkills: ["قواعد البيانات"],
  },
  {
    id: "algorithms-oop",
    officialLine: "البرمجة كائنية التوجه/هياكل البيانات/الخوارزميات",
    atomicSkills: ["البرمجة كائنية التوجه", "هياكل البيانات", "الخوارزميات"],
  },
  {
    id: "data-mining",
    officialLine: "تنقيب بيانات Weka/Orange",
    atomicSkills: ["تنقيب البيانات", "Weka", "Orange"],
  },
  {
    id: "networking",
    officialLine: "التوجيه/التبديل وشبكات الهيكلة",
    atomicSkills: ["التوجيه والتبديل", "شبكات الهيكلة"],
  },
  {
    id: "operating-systems",
    officialLine: "لينكس وأنظمة التشغيل",
    atomicSkills: ["لينكس", "أنظمة التشغيل"],
  },
  {
    id: "hardware",
    officialLine: "العتاد واستكشاف الأعطال",
    atomicSkills: ["العتاد", "استكشاف الأعطال"],
  },
];

export const canonicalTechnicalSkillsOfficialLinesAr = canonicalTechnicalSkillLinesAr.map(
  (g) => g.officialLine
);
