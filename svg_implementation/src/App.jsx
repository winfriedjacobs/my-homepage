import React, { useEffect, useRef } from "react";

import { 
  circles, 
  createCircles
 } from "./canvas/canvas";


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
