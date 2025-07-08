import React, { useEffect, useRef } from "react";

const lerp = (a, b, n) => (1 - n) * a + n * b;

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    let animationFrame;
    const animate = () => {
      pos.current.x = lerp(pos.current.x, mouse.current.x, 0.18);
      pos.current.y = lerp(pos.current.y, mouse.current.y, 0.18);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${
          pos.current.x - 10
        }px, ${pos.current.y - 10}px, 0)`;
      }
      animationFrame = requestAnimationFrame(animate);
    };
    animate();
    return () => cancelAnimationFrame(animationFrame);
  }, []);

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
        background: "rgba(255,255,255,0.8)",
        boxShadow: "0 2px 12px 2px rgba(255,255,255,0.2)",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        transition: "background 0.2s",
      }}
    />
  );
}
