import React, { useEffect, useRef } from "react";

import { createCircles } from "./canvas/circle";

import { basicAnimate } from "./canvas/animate";

// Hauptkomponente, die die Canvas-Animation rendert
export const App = () => {
  // `useRef` wird verwendet, um auf das DOM-Element des Canvas zuzugreifen
  const canvasRef = useRef(null);

  useEffect(() => {
    // canvasRef.current is set in <canvas ref={canvasRef} ...>, see below.
    // useEffect is (almost?) always run _after_ the DOM is updated and 
    // the canvas element is mounted
    const canvas = canvasRef.current;
    if (!canvas) return;  // ensures that the canvas element is present

    // Holen Sie sich den 2D-Rendering-Kontext
    const ctx = canvas.getContext("2d");

    // Funktion zur Anpassung der Canvas-Größe an das Fenster
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const animate = () => {
      // console.log(circles);

      basicAnimate(canvas, circles, ctx);
      // Fordert den Browser auf, das nächste Animationsframe aufzurufen
      requestAnimationFrame(animate);
    };

    // Initialisierung
    resizeCanvas();
    const circles = createCircles({ canvas });
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
