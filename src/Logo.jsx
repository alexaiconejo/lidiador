// Logo.jsx
import React from "react";
import { PiStarOfDavidLight } from "react-icons/pi";
import { HiMoon } from "react-icons/hi";
import { CgCross } from "react-icons/cg";


export default function Logo({ size = 62 }) {
  const color = "#000000"; // negro profesional

  return (
    <div
      style={{
        position: "relative",
        width: size,
        height: size * 1.5,
        margin: "auto",
        textAlign: "center",
      }}
      aria-label="Logo con luna islámica, estrella de David y cruz de Jesús"
    >
      {/* Luna islámica arriba */}
      <HiMoon
        size={size * 0.6}
        color={color}
        style={{ marginBottom: -size * 0.15 }}
        aria-label="Luna islámica"
      />

      {/* Contenedor para superponer estrella de David y cruz */}
      <div
        style={{
          position: "relative",
          width: size,
          height: size,
          marginTop: size * 0.1,
          display: "inline-block",
        }}
      >
        {/* Estrella de David */}
        <PiStarOfDavidLight size={size} color={color} aria-label="Estrella de David" />

        {/* Cruz de Jesús superpuesta, centrada */}
        <CgCross
          size={size * 1.5}
          color={color}
          style={{
            position: "absolute",
            top: "46%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            pointerEvents: "none",
          }}
          aria-label="Cruz de Jesús"
        />
      </div>
    </div>
  );
}
