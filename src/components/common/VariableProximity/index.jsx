import {
  forwardRef,
  useMemo,
  useRef,
  useEffect,
  useState,
  useLayoutEffect,
} from "react";
import { motion } from "framer-motion";
import "./index.css";

function useAnimationFrame(callback) {
  const callbackRef = useRef(callback);

  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  useEffect(() => {
    let frameId;
    const loop = () => {
      callbackRef.current();
      frameId = requestAnimationFrame(loop);
    };
    frameId = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(frameId);
  }, []);
}

function useGlobalMousePositionRef() {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x, y) => {
      positionRef.current = { x, y };
    };

    const handleMouseMove = (ev) => updatePosition(ev.pageX, ev.pageY);
    const handleTouchMove = (ev) => {
      if (ev.touches.length > 0) {
        const touch = ev.touches[0];
        updatePosition(touch.pageX, touch.pageY);
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

  return positionRef;
}

const VariableProximity = forwardRef((props, ref) => {
  const {
    label,
    fromFontVariationSettings,
    toFontVariationSettings,
    containerRef,
    radius = 50,
    falloff = "linear",
    className = "",
    onClick,
    style,
    ...restProps
  } = props;

  const letterRefs = useRef([]);
  const letterPositions = useRef([]);
  const containerRectRef = useRef(null);
  const isVisibleRef = useRef(false);
  const interpolatedSettingsRef = useRef([]);
  const mousePositionRef = useGlobalMousePositionRef();
  const lastPositionRef = useRef({ x: null, y: null });
  const [responsiveRadius, setResponsiveRadius] = useState(radius);

  const parsedSettings = useMemo(() => {
    const parseSettings = (settingsStr) =>
      new Map(
        settingsStr
          .split(",")
          .map((s) => s.trim())
          .map((s) => {
            const [name, value] = s.split(" ");
            return [name.replace(/['"]/g, ""), parseFloat(value)];
          })
      );

    const fromSettings = parseSettings(fromFontVariationSettings);
    const toSettings = parseSettings(toFontVariationSettings);

    return Array.from(fromSettings.entries()).map(([axis, fromValue]) => ({
      axis,
      fromValue,
      toValue: toSettings.get(axis) ?? fromValue,
    }));
  }, [fromFontVariationSettings, toFontVariationSettings]);

  const calculateDistance = (x1, y1, x2, y2) =>
    Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);

  const calculateFalloff = (distance) => {
    const norm = Math.min(Math.max(1 - distance / responsiveRadius, 0), 1);
    switch (falloff) {
      case "exponential":
        return norm ** 2;
      case "gaussian":
        return Math.exp(-((distance / (responsiveRadius / 2)) ** 2) / 2);
      case "linear":
      default:
        return norm;
    }
  };

  useEffect(() => {
    const container = containerRef?.current;
    if (!container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisibleRef.current = entry.isIntersecting;
      },
      { threshold: 0.01 }
    );
    observer.observe(container);
    return () => {
      observer.disconnect();
    };
  }, [containerRef]);

  useAnimationFrame(() => {
    if (!containerRef?.current || !isVisibleRef.current) return;

    const { x, y } = mousePositionRef.current;
    if (lastPositionRef.current.x === x && lastPositionRef.current.y === y) {
      return;
    }
    lastPositionRef.current = { x, y };

    if (letterPositions.current.length === 0 || !containerRectRef.current) {
      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      containerRectRef.current = {
        left: rect.left + window.scrollX,
        top: rect.top + window.scrollY,
      };

      const positions = [];
      letterRefs.current.forEach((letterRef) => {
        if (!letterRef) {
          positions.push(null);
          return;
        }
        const letterRect = letterRef.getBoundingClientRect();
        positions.push({
          x: letterRect.left + letterRect.width / 2 - rect.left,
          y: letterRect.top + letterRect.height / 2 - rect.top,
        });
      });
      letterPositions.current = positions;
    }

    const containerDocPos = containerRectRef.current;
    const mouseRelX = x - containerDocPos.left;
    const mouseRelY = y - containerDocPos.top;

    letterRefs.current.forEach((letterRef, index) => {
      if (!letterRef) return;
      const pos = letterPositions.current[index];
      if (!pos) return;

      const distance = calculateDistance(mouseRelX, mouseRelY, pos.x, pos.y);

      if (distance >= responsiveRadius) {
        letterRef.style.fontVariationSettings = fromFontVariationSettings;
        return;
      }

      const falloffValue = calculateFalloff(distance);
      const newSettings = parsedSettings
        .map(({ axis, fromValue, toValue }) => {
          const interpolatedValue =
            fromValue + (toValue - fromValue) * falloffValue;
          return `'${axis}' ${interpolatedValue}`;
        })
        .join(", ");

      interpolatedSettingsRef.current[index] = newSettings;
      letterRef.style.fontVariationSettings = newSettings;
    });
  });

  useLayoutEffect(() => {
    if (!containerRef?.current) return;
    const handleResize = () => {
      const width = containerRef.current.offsetWidth;
      setResponsiveRadius(Math.max(width * 0.2, 40)); // 20% of width, min 40px
      letterPositions.current = [];
      containerRectRef.current = null;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [containerRef]);

  const words = label.split(" ");
  let letterIndex = 0;

  return (
    <span
      ref={ref}
      className={`${className} variable-proximity`}
      onClick={onClick}
      style={{ display: "inline", ...style }}
      {...restProps}
    >
      {words.map((word, wordIndex) => (
        <span
          key={wordIndex}
          style={{ display: "inline-block", whiteSpace: "nowrap" }}
        >
          {word.split("").map((letter) => {
            const currentLetterIndex = letterIndex++;
            return (
              <motion.span
                key={currentLetterIndex}
                ref={(el) => {
                  letterRefs.current[currentLetterIndex] = el;
                }}
                style={{
                  display: "inline-block",
                  fontVariationSettings:
                    interpolatedSettingsRef.current[currentLetterIndex],
                }}
                aria-hidden="true"
              >
                {letter}
              </motion.span>
            );
          })}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
      <span className="sr-only">{label}</span>
    </span>
  );
});

VariableProximity.displayName = "VariableProximity";
export default VariableProximity;
