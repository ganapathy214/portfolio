import React, { useEffect, useMemo, useRef, useState } from "react";

const lerp = (a, b, n) => (1 - n) * a + n * b;

export default function CustomCursor() {
  const isTouch = useMemo(
    () => typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches,
    []
  );
  const cursorRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    if (isTouch) return;
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    const handleMouseOver = (e) => {
      if (!e.target) return;
      // Detect interactive elements
      const target = e.target;
      if (
        target.closest("a, button, [role='button'], .cursor-pointer, input, textarea")
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [isTouch]);

  useEffect(() => {
    if (isTouch) return;
    let animationFrame;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.95);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.95);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          pos.current.x - 10
        }px, ${pos.current.y - 10}px, 0)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, [isTouch]);

  if (isTouch) return null;

  return (
    <div
      ref={cursorRef}
      style={{
        position: "fixed",
        left: 0,
        top: 0,
        width: 20,
        height: 20,
        borderRadius: "50%",
        background: isHovering ? "rgba(56, 189, 248, 0.6)" : "rgba(255, 255, 255, 0.8)",
        boxShadow: isHovering 
          ? "0 0 20px 4px rgba(56, 189, 248, 0.4)" 
          : "0 2px 12px 2px rgba(255, 255, 255, 0.2)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: isHovering ? "normal" : "difference",
        scale: isHovering ? "1.8" : "1",
        transition: "background 0.3s, box-shadow 0.3s, scale 0.2s ease-out",
      }}
    />
  );
}
