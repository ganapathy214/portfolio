import VariableProximity from "../VariableProximity";

export const SectionHeader = ({ containerRef, label }) => (
  <div
    ref={containerRef}
    className="text-5xl text-end mb-4 text-sky-400 border-b-4"
    style={{ position: "relative" }}
  >
    <VariableProximity
      label={label}
      className="variable-proximity-demo"
      fromFontVariationSettings="'wght' 400, 'opsz' 9"
      toFontVariationSettings="'wght' 1000, 'opsz' 40"
      containerRef={containerRef}
      radius={100}
      falloff="linear"
    />
  </div>
);
