import React from "react";
import styles from "./FlagshipBlueprint.module.css";

interface FlagshipBlueprintProps {
  locale?: "en" | "ar" | "de";
  className?: string;
}

export function FlagshipBlueprint({
  locale = "en",
  className,
}: FlagshipBlueprintProps) {
  const isAr = locale === "ar";
  const isDe = locale === "de";

  const labels = {
    specPrefix: "SPEC-2026.04",
    specTitle: isAr
      ? "المخطط الهيكلي لمنظومة FoundationKit"
      : isDe
      ? "FoundationKit Systemarchitektur-Blaupause"
      : "FoundationKit System Architecture Blueprint",
    statusBadge: isAr ? "قيد المعاينة / ما قبل الإنتاج" : isDe ? "Pre-Production / Aktiv" : "Pre-Production / Active",
    tier1Num: "01",
    tier1Title: isAr ? "طبقة واجهة وتطبيقات العميل" : isDe ? "Client & Tooling-Ebene" : "Client & Tooling Layer",
    tier2Num: "02",
    tier2Title: isAr ? "نواة المنصة وهندسة النظم النظيفة" : isDe ? "Plattformkern & Clean Architecture" : "Core Platform & Clean Architecture",
    tier3Num: "03",
    tier3Title: isAr ? "التشغيل وقواعد البيانات" : isDe ? "Laufzeit & Datenpersistenz" : "Runtime & Persistence Layer",
    nodeStudio: "Project Studio",
    nodeStudioRole: isAr ? "تكوين مرئي عبر Blazor Wasm" : isDe ? "Visuelle Blazor Wasm Komposition" : "Blazor Wasm Visual Composition",
    nodeClient: "Typed C# Client",
    nodeClientRole: isAr ? "عميل قوي التوصيف عبر OpenAPI" : isDe ? "Stark typisierter OpenAPI-Client" : "Strongly-typed OpenAPI Client",
    nodePostman: "Postman Sync",
    nodePostmanRole: isAr ? "مزامنة عقود الـ API آلياً" : isDe ? "Automatisierte API-Vertragssynchronisation" : "Automated Contract Sync",
    nodePackages: "17 NuGet Packages",
    nodePackagesRole: isAr ? "تجريدات المنصة القابلة لإعادة الاستخدام" : isDe ? "Wiederverwendbare Plattformabstraktionen" : "Reusable Platform Abstractions",
    nodeComposer: "Deterministic Composer",
    nodeComposerRole: isAr ? "توليد كود منضبط (schema v1/v2)" : isDe ? "Deterministische Code-Gen (Schema v1/v2)" : "Deterministic Code-Gen (Schema v1/v2)",
    nodeDomain: "Domain & Use Cases",
    nodeDomainRole: isAr ? "فصل صارم للمسؤوليات (Clean Arch)" : isDe ? "Strikte Clean Architecture Trennung" : "Strict Clean Architecture Separation",
    nodeHost: "Workbench Host",
    nodeHostRole: isAr ? "بيئة اختبار تشغيلية شاملة" : isDe ? "End-to-End Referenz-Testbed" : "End-to-End Reference Testbed",
    nodePersistence: "EF Core & SQL Server",
    nodePersistenceRole: isAr ? "نماذج قراءة وكتابة محسّنة للأداء" : isDe ? "SQL-first Lese- und Schreibmodelle" : "SQL-first Read & Write Models",
    metricPackagesLabel: isAr ? "حزم قابلة لإعادة الاستخدام:" : isDe ? "Wiederverwendbare Pakete:" : "Reusable Packages:",
    metricTargetLabel: isAr ? "الإطار المستهدف:" : isDe ? "Ziel-Framework:" : "Target Framework:",
    metricCodeGenLabel: isAr ? "محرك التوليد:" : isDe ? "Generierung:" : "Code Generation:",
    metricCodeGenVal: isAr ? "منضبط حتمياً" : isDe ? "Deterministisch" : "Deterministic",
    footerTarget: ".NET 10 LTS Ready",
  };

  const busContractNode = isAr ? (
    <>⚡ نقل البيانات عبر عقود <bdi dir="ltr">OpenAPI 3.0</bdi></>
  ) : isDe ? (
    <bdi dir="ltr">⚡ OpenAPI 3.0 Datentransportvertrag</bdi>
  ) : (
    <bdi dir="ltr">⚡ OpenAPI 3.0 Transport Contract</bdi>
  );

  const busRuntimeNode = isAr ? (
    <>🔌 وسيط التشغيل وتكامل <bdi dir="ltr">EF Core Pipeline</bdi></>
  ) : isDe ? (
    <bdi dir="ltr">🔌 Runtime-Hosting & EF Core Pipeline</bdi>
  ) : (
    <bdi dir="ltr">🔌 Runtime Hosting & EF Core Pipeline</bdi>
  );

  return (
    <div
      className={`${styles.blueprintContainer} ${className || ""}`}
      aria-label={labels.specTitle}
    >
      <div className={styles.blueprintHeader}>
        <div className={styles.specIdGroup}>
          <span className={styles.specPrefix}>
            <bdi dir="ltr">{labels.specPrefix}</bdi>
          </span>
          <span className={styles.specTitle}>{labels.specTitle}</span>
        </div>
        <div className={styles.statusIndicator}>
          <span className={styles.statusDot} aria-hidden="true" />
          <span>{labels.statusBadge}</span>
        </div>
      </div>

      <div className={styles.architectureCanvas}>
        {/* Tier 1: Client & Tooling */}
        <div className={styles.archTier}>
          <div className={styles.tierLabelRow}>
            <span className={styles.tierNumber}>
              <bdi dir="ltr">{labels.tier1Num}</bdi>
            </span>
            <span className={styles.tierTitle}>{labels.tier1Title}</span>
          </div>
          <div className={styles.tierNodesGrid}>
            <div className={`${styles.nodeBox} ${styles.nodeBoxFeatured}`}>
              <span className={styles.nodeName}>
                <bdi dir="ltr">{labels.nodeStudio}</bdi>
              </span>
              <span className={styles.nodeRole}>{labels.nodeStudioRole}</span>
            </div>
            <div className={styles.nodeBox}>
              <span className={styles.nodeName}>
                <bdi dir="ltr">{labels.nodeClient}</bdi>
              </span>
              <span className={styles.nodeRole}>{labels.nodeClientRole}</span>
            </div>
            <div className={styles.nodeBox}>
              <span className={styles.nodeName}>
                <bdi dir="ltr">{labels.nodePostman}</bdi>
              </span>
              <span className={styles.nodeRole}>{labels.nodePostmanRole}</span>
            </div>
          </div>
        </div>

        {/* Connector Bus 1 */}
        <div className={styles.connectorBus} aria-hidden="true">
          <span className={styles.connectorLine} />
          <span className={styles.connectorLabel}>
            {busContractNode}
          </span>
          <span className={styles.connectorLine} />
        </div>

        {/* Tier 2: Core Platform & Clean Architecture */}
        <div className={styles.archTier}>
          <div className={styles.tierLabelRow}>
            <span className={styles.tierNumber}>
              <bdi dir="ltr">{labels.tier2Num}</bdi>
            </span>
            <span className={styles.tierTitle}>{labels.tier2Title}</span>
          </div>
          <div className={styles.tierNodesGrid}>
            <div className={`${styles.nodeBox} ${styles.nodeBoxFeatured}`}>
              <span className={styles.nodeName}>
                <bdi dir="ltr">{labels.nodePackages}</bdi>
              </span>
              <span className={styles.nodeRole}>{labels.nodePackagesRole}</span>
            </div>
            <div className={styles.nodeBox}>
              <span className={styles.nodeName}>
                <bdi dir="ltr">{labels.nodeComposer}</bdi>
              </span>
              <span className={styles.nodeRole}>{labels.nodeComposerRole}</span>
            </div>
            <div className={styles.nodeBox}>
              <span className={styles.nodeName}>
                <bdi dir="ltr">{labels.nodeDomain}</bdi>
              </span>
              <span className={styles.nodeRole}>{labels.nodeDomainRole}</span>
            </div>
          </div>
        </div>

        {/* Connector Bus 2 */}
        <div className={styles.connectorBus} aria-hidden="true">
          <span className={styles.connectorLine} />
          <span className={styles.connectorLabel}>
            {busRuntimeNode}
          </span>
          <span className={styles.connectorLine} />
        </div>

        {/* Tier 3: Runtime & Persistence */}
        <div className={styles.archTier}>
          <div className={styles.tierLabelRow}>
            <span className={styles.tierNumber}>
              <bdi dir="ltr">{labels.tier3Num}</bdi>
            </span>
            <span className={styles.tierTitle}>{labels.tier3Title}</span>
          </div>
          <div className={styles.tierNodesGrid}>
            <div className={styles.nodeBox}>
              <span className={styles.nodeName}>
                <bdi dir="ltr">{labels.nodeHost}</bdi>
              </span>
              <span className={styles.nodeRole}>{labels.nodeHostRole}</span>
            </div>
            <div className={`${styles.nodeBox} ${styles.nodeBoxFeatured}`}>
              <span className={styles.nodeName}>
                <bdi dir="ltr">{labels.nodePersistence}</bdi>
              </span>
              <span className={styles.nodeRole}>{labels.nodePersistenceRole}</span>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.blueprintFooter}>
        <div className={styles.footerMetric}>
          <span>{labels.metricPackagesLabel}</span>
          <span className={styles.metricValue}>
            <bdi dir="ltr">17 NuGet pkgs</bdi>
          </span>
        </div>
        <div className={styles.footerMetric}>
          <span>{labels.metricCodeGenLabel}</span>
          <span className={styles.metricValue}>
            <bdi dir="ltr">{labels.metricCodeGenVal}</bdi>
          </span>
        </div>
        <div className={styles.footerTarget}>
          <bdi dir="ltr">{labels.footerTarget}</bdi>
        </div>
      </div>
    </div>
  );
}
