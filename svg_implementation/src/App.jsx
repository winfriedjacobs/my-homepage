import React, { useEffect, useRef } from "react";

import { Circle, circles } from "./canvas/canvas";


// Funktion zum Erzeugen von 15 Scheiben mit zufälligen Eigenschaften
const createCircles = ({ canvas }) => {
  // Generiert eine zufällige RGB-Farbe mit einem Alpha-Wert
  const getRandomRgba = () => {
    const r = Math.floor(Math.random() * 256);
    const g = Math.floor(Math.random() * 256);
    const b = Math.floor(Math.random() * 256);
    // Der Alpha-Wert (a) wurde auf 0.5 gesetzt, um Transparenz zu erreichen
    return `rgba(${r}, ${g}, ${b}, 0.5)`;
  };

  for (let i = 0; i < 15; i++) {
    const radius = 30;
    const x = Math.random() * (canvas.width - radius * 2) + radius;
    const y = Math.random() * (canvas.height - radius * 2) + radius;
    const dx = (Math.random() - 0.5) * 2.0;
    const dy = (Math.random() - 0.5) * 2.5;
    const color = getRandomRgba(); // Verwendet die neue Funktion für zufällige transparente Farben
    circles.push(new Circle(x, y, radius, dx, dy, color));
  }
};

// Hauptkomponente, die die Canvas-Animation rendert
export const App = () => {
  // `useRef` wird verwendet, um auf das DOM-Element des Canvas zuzugreifen
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Stellt sicher, dass das Canvas-Element existiert

    // Holen Sie sich den 2D-Rendering-Kontext
    const ctx = canvas.getContext("2d");

    // Funktion zur Anpassung der Canvas-Größe an das Fenster
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    // Funktion für die Animationsschleife
    const animate = () => {
      console.log(circles);

      // Löschen des gesamten Canvas-Bereichs
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Aktualisieren und Zeichnen jeder Scheibe im Array
      circles.forEach((circle) => {
        circle.update({ canvas, ctx });
      });

      // Fordert den Browser auf, das nächste Animationsframe aufzurufen
      requestAnimationFrame(animate);
    };

    // Initialisierung
    resizeCanvas();
    createCircles({ canvas });
    animate();

    // Listener für die Größenänderung des Fensters
    window.addEventListener("resize", resizeCanvas);

    // Clean-up Funktion, um den Event-Listener zu entfernen, wenn die Komponente unmountet wird
    return () => {
      window.removeEventListener("resize", resizeCanvas);
    };
  }, []); // Das leere Array [] sorgt dafür, dass dieser Effekt nur einmal ausgeführt wird, wie bei componentDidMount

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f4f8] p-4">
      <canvas
        ref={canvasRef}
        className="rounded-xl shadow-lg bg-[#0d1117] max-w-full h-[calc(100vh-2rem)]"
      ></canvas>
    </div>
  );
};
