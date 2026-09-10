"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";

export function HeroAliveSignal() {
  const reduce = useReducedMotion();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: 0.5, y: 0.5, targetX: 0.5, targetY: 0.5 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (reduce) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const resize = () => {
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.clientY - rect.top) / rect.height;
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      const rect = canvas.getBoundingClientRect();
      mouseRef.current.targetX = (e.touches[0].clientX - rect.left) / rect.width;
      mouseRef.current.targetY = (e.touches[0].clientY - rect.top) / rect.height;
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });

    const render = () => {
      time += 0.012;
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;

      // Smooth mouse/touch interpolation
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.04;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.04;

      ctx.clearRect(0, 0, w, h);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      // Draw 3 subtle clinical flow lines (representing patient pathway movement)
      const lines = [
        { color: "rgba(127, 212, 208, 0.22)", baseHeight: 0.65, amp: 20, freq: 0.003, speed: 1.0 },
        { color: "rgba(215, 236, 227, 0.16)", baseHeight: 0.68, amp: 15, freq: 0.004, speed: 0.8 },
        { color: "rgba(227, 138, 114, 0.18)", baseHeight: 0.72, amp: 12, freq: 0.0025, speed: 1.1 },
      ];

      lines.forEach((line) => {
        ctx.beginPath();
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 1.4;

        for (let x = 0; x <= w; x += 6) {
          const distToMouse = Math.abs(x / w - mx);
          const mouseInfluence = Math.exp(-distToMouse * 3.5) * (my - 0.5) * 35;

          const wave =
            Math.sin(x * line.freq + time * line.speed) * line.amp +
            Math.sin(x * line.freq * 2.1 - time * 0.5) * (line.amp * 0.35);

          const y = h * line.baseHeight + wave + mouseInfluence;

          if (x === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.stroke();
      });

      // Subtle clinical landmark pulse nodes along the care line
      const nodes = [0.25, 0.5, 0.75];
      nodes.forEach((pos, idx) => {
        const x = w * pos;
        const dist = Math.abs(pos - mx);
        const mouseLift = Math.exp(-dist * 3.5) * (my - 0.5) * 35;
        const y = h * 0.68 + Math.sin(x * 0.003 + time) * 16 + mouseLift;

        // Glowing landmark dot
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fillStyle = idx === 1 ? "rgba(227, 138, 114, 0.75)" : "rgba(127, 212, 208, 0.75)";
        ctx.fill();

        // Subtle breath ring
        ctx.beginPath();
        const pulse = 5 + Math.sin(time * 2 + idx) * 2.5;
        ctx.arc(x, y, pulse, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(127, 212, 208, 0.16)";
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
    };
  }, [reduce]);

  if (!mounted || reduce) return null;

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden opacity-90">
      <canvas
        ref={canvasRef}
        className="h-full w-full"
        style={{ width: "100%", height: "100%" }}
        aria-hidden="true"
      />
    </div>
  );
}
