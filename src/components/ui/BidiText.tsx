import React from "react";

/**
 * Isolates Latin technical tokens (such as .NET, .NET 10, C#, ASP.NET Core,
 * EF Core, OpenAPI 3.0, OpenCV, PyTorch, SQL Server, ATS) in <bdi dir="ltr">
 * so punctuation-prefixed tokens never flip visually inside RTL Arabic text.
 */
const TECH_TOKEN_REGEX =
  /(\.NET(?:\s+\d+(?:\.\d+)?)?|ASP\.NET\s+Core|EF\s+Core|C#|C\+\+|OpenAPI(?:\s+\d+(?:\.\d+)?)?|OpenCV|PyTorch|SQL\s+Server|Blazor(?:\s+WebAssembly|\s+Wasm)?|FoundationKit|ROBOCAM|MikroTik(?:\s+Hotspot)?|RouterOS|RADIUS|Flutter|Dart|Python|JavaScript|TypeScript|HTML5|CSS3|PLC|SCADA|ATS|PDF|GitHub|API|JSON|SQL|AI)/g;

interface BidiTextProps {
  text: string;
  locale?: "en" | "ar" | "de";
}

export function BidiText({ text, locale = "ar" }: BidiTextProps) {
  if (locale !== "ar") {
    return <>{text}</>;
  }

  const parts = text.split(TECH_TOKEN_REGEX);
  if (parts.length <= 1) {
    return <>{text}</>;
  }

  return (
    <>
      {parts.map((part, idx) =>
        idx % 2 === 1 ? (
          <bdi
            key={idx}
            dir="ltr"
            style={{ direction: "ltr", unicodeBidi: "isolate" }}
          >
            {part}
          </bdi>
        ) : (
          <React.Fragment key={idx}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
