import { useEffect, useRef } from "react";
import gsap from "gsap";

export function TechnicalBackground() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Parallax effect on mouse move
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 40;
      const y = (clientY / window.innerHeight - 0.5) * 40;

      gsap.to(".parallax-bg", { x: x * 0.3, y: y * 0.3, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-mid", { x: x * 0.6, y: y * 0.6, duration: 1, ease: "power2.out" });
      gsap.to(".parallax-fg", { x: x * 1, y: y * 1, duration: 1, ease: "power2.out" });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Pulse nodes
    gsap.to(".pulse-node", {
      scale: 1.5,
      opacity: 0.4,
      duration: 1.5,
      repeat: -1,
      yoyo: true,
      stagger: {
        each: 0.2,
        from: "random",
      },
      transformOrigin: "center",
    });

    // Flowing data lines
    gsap.to(".data-flow", {
      strokeDashoffset: -200,
      duration: 3,
      repeat: -1,
      ease: "linear",
    });

    // Slow rotation of background elements
    gsap.to(".rotate-slow", {
      rotation: 360,
      duration: 120,
      repeat: -1,
      ease: "none",
      transformOrigin: "center",
    });

    gsap.to(".rotate-slow-reverse", {
      rotation: -360,
      duration: 150,
      repeat: -1,
      ease: "none",
      transformOrigin: "center",
    });

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-30 mix-blend-screen"
    >
      <svg
        viewBox="0 0 1200 800"
        className="w-full h-full object-cover"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>

        {/* Background Grid & Circles */}
        <g
          className="parallax-bg"
          stroke="currentColor"
          strokeWidth="1"
          strokeOpacity="0.15"
          fill="none"
        >
          <g className="rotate-slow" style={{ transformOrigin: "600px 400px" }}>
            <circle cx="600" cy="400" r="350" strokeDasharray="4 12" />
            <circle cx="600" cy="400" r="250" strokeDasharray="1 6" />
          </g>
          <g className="rotate-slow-reverse" style={{ transformOrigin: "600px 400px" }}>
            <circle cx="600" cy="400" r="450" strokeDasharray="8 16" />
          </g>
          {/* Crosshairs */}
          <path d="M 200 190 L 200 210 M 190 200 L 210 200" />
          <path d="M 1000 190 L 1000 210 M 990 200 L 1010 200" />
          <path d="M 200 590 L 200 610 M 190 600 L 210 600" />
          <path d="M 1000 590 L 1000 610 M 990 600 L 1010 600" />
        </g>

        {/* Main Schematic Elements */}
        <g
          className="parallax-mid text-[color:var(--color-brand)]"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
        >
          {/* PLC Box (Bottom Left) */}
          <g transform="translate(150, 480)">
            <rect x="0" y="0" width="160" height="140" rx="4" strokeOpacity="0.8" />
            <rect x="10" y="10" width="30" height="120" rx="2" strokeOpacity="0.5" />
            <rect x="50" y="10" width="30" height="120" rx="2" strokeOpacity="0.5" />
            <rect x="90" y="10" width="20" height="120" rx="2" strokeOpacity="0.5" />
            <rect x="120" y="10" width="30" height="120" rx="2" strokeOpacity="0.5" />
            <circle cx="25" cy="30" r="3" fill="currentColor" />
            <circle cx="25" cy="45" r="3" fill="currentColor" />
            <circle cx="25" cy="60" r="3" fill="currentColor" />
            <path d="M 65 30 L 65 60 M 65 70 L 65 100" strokeDasharray="2 4" />
          </g>

          {/* Chip/Processor (Top Left) */}
          <g transform="translate(220, 120)">
            <rect x="0" y="0" width="80" height="80" rx="4" strokeOpacity="0.8" />
            <rect x="15" y="15" width="50" height="50" rx="2" strokeOpacity="0.4" />
            <path d="M -10 20 L 0 20 M -10 40 L 0 40 M -10 60 L 0 60" strokeOpacity="0.6" />
            <path d="M 80 20 L 90 20 M 80 40 L 90 40 M 80 60 L 90 60" strokeOpacity="0.6" />
            <path d="M 20 -10 L 20 0 M 40 -10 L 40 0 M 60 -10 L 60 0" strokeOpacity="0.6" />
            <path d="M 20 80 L 20 90 M 40 80 L 40 90 M 60 80 L 60 90" strokeOpacity="0.6" />
            <circle cx="25" cy="25" r="2" fill="currentColor" />
            <circle cx="40" cy="25" r="2" fill="currentColor" />
            <circle cx="55" cy="25" r="2" fill="currentColor" />
            <circle cx="25" cy="40" r="2" fill="currentColor" />
            <circle cx="40" cy="40" r="2" fill="currentColor" />
            <circle cx="55" cy="40" r="2" fill="currentColor" />
            <circle cx="25" cy="55" r="2" fill="currentColor" />
            <circle cx="40" cy="55" r="2" fill="currentColor" />
            <circle cx="55" cy="55" r="2" fill="currentColor" />
          </g>

          {/* Sensor / Motor 1 (Right) */}
          <g transform="translate(900, 320)">
            <rect x="0" y="0" width="70" height="70" rx="4" strokeOpacity="0.8" />
            <circle cx="35" cy="35" r="20" strokeOpacity="0.5" />
            <circle cx="35" cy="35" r="8" fill="currentColor" fillOpacity="0.2" />
            <circle cx="10" cy="10" r="2" />
            <circle cx="60" cy="10" r="2" />
            <circle cx="10" cy="60" r="2" />
            <circle cx="60" cy="60" r="2" />
          </g>

          {/* Sensor / Motor 2 (Bottom Right) */}
          <g transform="translate(850, 600)">
            <rect x="0" y="0" width="60" height="60" rx="4" strokeOpacity="0.8" />
            <circle cx="30" cy="30" r="15" strokeOpacity="0.5" />
            <rect x="25" y="25" width="10" height="10" fill="currentColor" fillOpacity="0.2" />
          </g>

          {/* Robotic Arm (Center) */}
          <g transform="translate(550, 350)" strokeOpacity="0.9">
            {/* Base */}
            <path d="M -50 350 L 50 350 L 30 300 L -30 300 Z" />
            <rect x="-10" y="260" width="20" height="40" />
            <path d="M -40 260 L 40 260 L 40 240 L -40 240 Z" />

            {/* Joint 1 */}
            <circle cx="0" cy="200" r="40" />
            <circle cx="0" cy="200" r="20" strokeDasharray="4 4" />

            {/* Lower Arm */}
            <path d="M -25 175 L -100 0 L -50 -20 L 25 175 Z" />

            {/* Joint 2 */}
            <circle cx="-75" cy="-10" r="35" />
            <circle cx="-75" cy="-10" r="15" strokeDasharray="4 4" />

            {/* Upper Arm */}
            <path d="M -100 10 L -250 120 L -220 150 L -60 -30 Z" />

            {/* Wrist Joint */}
            <circle cx="-235" cy="135" r="25" />
            <circle cx="-235" cy="135" r="10" />

            {/* Gripper Base */}
            <path d="M -255 150 L -270 180 L -230 200 L -215 170 Z" />

            {/* Claws */}
            <path d="M -270 180 L -290 230 L -280 240 L -250 190" />
            <path d="M -230 200 L -230 260 L -215 265 L -215 195" />
          </g>

          {/* Connecting Lines (Static Background) */}
          <g strokeOpacity="0.3" strokeDasharray="2 4">
            <path d="M 310 550 L 450 550 L 450 650 L 550 650" />
            <path d="M 300 160 L 400 160 L 400 340 L 475 340" />
            <path d="M 900 355 L 800 355 L 800 450 L 650 450" />
            <path d="M 850 630 L 750 630 L 750 550 L 600 550" />
            <path d="M 230 480 L 230 350 L 100 350 L 100 200 L 220 200" />
          </g>
        </g>

        {/* Foreground Animated Elements */}
        <g className="parallax-fg text-[color:var(--color-brand)]" fill="currentColor">
          {/* Data Flow Lines (Animated) */}
          <g stroke="currentColor" strokeWidth="2" fill="none" filter="url(#glow)">
            <path
              className="data-flow"
              strokeDasharray="15 300"
              strokeDashoffset="0"
              d="M 310 550 L 450 550 L 450 650 L 550 650"
            />
            <path
              className="data-flow"
              strokeDasharray="20 400"
              strokeDashoffset="0"
              d="M 300 160 L 400 160 L 400 340 L 475 340"
            />
            <path
              className="data-flow"
              strokeDasharray="10 250"
              strokeDashoffset="0"
              d="M 900 355 L 800 355 L 800 450 L 650 450"
            />
            <path
              className="data-flow"
              strokeDasharray="25 350"
              strokeDashoffset="0"
              d="M 850 630 L 750 630 L 750 550 L 600 550"
            />
            <path
              className="data-flow"
              strokeDasharray="15 450"
              strokeDashoffset="0"
              d="M 230 480 L 230 350 L 100 350 L 100 200 L 220 200"
            />
          </g>

          {/* Glowing Nodes */}
          <g filter="url(#glow)">
            {/* PLC to Arm */}
            <circle cx="310" cy="550" r="4" className="pulse-node" />
            <circle cx="450" cy="550" r="3" />
            <circle cx="450" cy="650" r="3" />
            <circle cx="550" cy="650" r="4" className="pulse-node" />

            {/* Chip to Arm */}
            <circle cx="300" cy="160" r="4" className="pulse-node" />
            <circle cx="400" cy="160" r="3" />
            <circle cx="400" cy="340" r="3" />
            <circle cx="475" cy="340" r="4" className="pulse-node" />

            {/* Sensor 1 to Arm */}
            <circle cx="900" cy="355" r="4" className="pulse-node" />
            <circle cx="800" cy="355" r="3" />
            <circle cx="800" cy="450" r="3" />
            <circle cx="650" cy="450" r="4" className="pulse-node" />

            {/* Sensor 2 to Arm */}
            <circle cx="850" cy="630" r="4" className="pulse-node" />
            <circle cx="750" cy="630" r="3" />
            <circle cx="750" cy="550" r="3" />
            <circle cx="600" cy="550" r="4" className="pulse-node" />

            {/* PLC to Chip */}
            <circle cx="230" cy="480" r="4" className="pulse-node" />
            <circle cx="230" cy="350" r="3" />
            <circle cx="100" cy="350" r="3" />
            <circle cx="100" cy="200" r="3" />
            <circle cx="220" cy="200" r="4" className="pulse-node" />
          </g>
        </g>
      </svg>
    </div>
  );
}
