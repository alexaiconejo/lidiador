// Protagonists.tsx
import React from "react";

interface ProtagonistsProps {
  year: string;
  male: string;
  female: string;
}

const Protagonists: React.FC<ProtagonistsProps> = ({ year, male, female }) => {
  return (
    <aside
      style={{
        position: "fixed",
        right: 0,
        top: "40%",
        width: 220,
        padding: "1rem",
        backgroundColor: "#eef0ff",
        borderRadius: 8,
        boxShadow: "0 2px 12px rgba(90, 79, 255, 0.2)",
        fontStyle: "italic",
        color: "#333",
        maxWidth: "90vw",
        zIndex: 100,
      }}
    >
      <h3 style={{ marginTop: 0, marginBottom: "1rem", color: "#222" }}>
        Protagonistas Hakohen - {year}
      </h3>
      <p>
        <strong>Masculino:</strong> {male}
      </p>
      <p>
        <strong>Femenino:</strong> {female}
      </p>
    </aside>
  );
};

export default Protagonists;
