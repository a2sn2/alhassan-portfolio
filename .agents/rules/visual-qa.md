# Visual Quality Assurance (QA) Rules

These rules mandate rigorous visual and interactive verification before completing any UI or frontend task on **alhassan-portfolio**.

## Mandatory Visual QA Workflow
Never declare a frontend or styling task complete based solely on code compilation. Every meaningful UI modification requires runtime browser validation:

1. **Spin up local dev server**:
   - Ensure the server compiles cleanly with 0 build errors.
2. **Visual Inspection**:
   - Open the running application in the browser.
   - Visually inspect the rendered output against design intentions.
3. **Exhaustive Checkpoints**:
   - **Typography**: Check font loading, weight rendering, line-height breathing room, letter spacing, and contrast.
   - **Spacing & Alignment**: Verify vertical rhythm, consistent gutter margins, baseline alignment of headers and subtext.
   - **Text Wrapping & Containment**: Stress-test headings and body copy for awkward line breaks, orphan words, clipping, or box overflows.
   - **Density & Whitespace**: Ensure elements have room to breathe without feeling sparse or unanchored.
   - **Visual Hierarchy**: Confirm the eye is naturally drawn to primary focal points before secondary metadata.
   - **Responsive Behavior**: Test across Mobile (375px/414px), Tablet (768px), Laptop (1280px), and Wide Desktop (1440px+).
   - **Interaction States**: Hover, focus-visible, and active states on all buttons, links, and interactive controls.
   - **Accessibility & Contrast**: Verify keyboard navigation flow and color contrast readability.
   - **Console & Performance**: Inspect the browser devtools console for warnings, hydration mismatches, missing key props, or network errors.
4. **Remediate & Re-verify**:
   - Immediately fix any defects detected during visual inspection.
   - Re-inspect the affected area to verify the fix before closing the task.
