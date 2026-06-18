import { useEffect, useState } from "react";
import { animate } from "framer-motion";

export default function CountUp({ end, duration = 1 }) {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const controls = animate(0, Number(end), {
      duration,
      onUpdate: (v) => setValue(v),
    });
    return controls.stop;
  }, [end, duration]);

  return (
    <span>
      {Number(value) % 1 != 0 ? Number(value).toFixed(1) : Math.round(value)}
    </span>
    // <span>{Number(value)}</span>
  );
}
