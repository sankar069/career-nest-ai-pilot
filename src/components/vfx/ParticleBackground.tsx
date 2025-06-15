
import { useCallback } from "react";
import Particles from "@tsparticles/react";
import { loadFull } from "@tsparticles/engine";

export function ParticleBackground() {
  const particlesLoad = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <Particles
      id="tsparticles"
      load={particlesLoad}
      options={{
        fullScreen: { enable: true, zIndex: -2 },
        background: { color: { value: "#0a0326" } },
        particles: {
          number: { value: 60, density: { enable: true, area: 800 } },
          color: { value: ["#352cf6", "#61e5fc", "#97ff5c", "#e5e8ff"] },
          shape: { type: ["circle", "polygon"], polygon: { nb_sides: 6 } },
          opacity: { value: 0.33, random: { enable: true, minimumValue: 0.13 } },
          size: { value: 6, random: { enable: true, minimumValue: 2 } },
          links: {
            enable: true,
            distance: 165,
            color: "#61e5fc",
            opacity: 0.19,
            width: 2,
            triangles: { enable: true, opacity: 0.06 },
          },
          move: {
            enable: true,
            speed: 1.3,
            direction: "none",
            outModes: { default: "bounce" },
            attract: { enable: false },
          },
          shadow: {
            enable: false
          },
          glow: {
            enable: false
          }
        },
        interactivity: {
          events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
          },
          modes: {
            repulse: { distance: 120 },
            push: { quantity: 4 }
          }
        },
        detectRetina: true,
      }}
    />
  );
}
