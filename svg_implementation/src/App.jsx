import React, { useEffect, useRef } from 'react';

// Hauptkomponente, die die Canvas-Animation rendert
export const App = () => {
  // `useRef` wird verwendet, um auf das DOM-Element des Canvas zuzugreifen
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Stellt sicher, dass das Canvas-Element existiert
    
    // Holen Sie sich den 2D-Rendering-Kontext
    const ctx = canvas.getContext('2d');

    // Funktion zur Anpassung der Canvas-Größe an das Fenster
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    // Klasse für die Scheiben
    class Circle {
        constructor(x, y, radius, dx, dy, color) {
            this.x = x;
            this.y = y;
            this.radius = radius;
            this.dx = dx;
            this.dy = dy;
            this.color = color;
        }

        // Methode zum Zeichnen der Scheibe
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
            ctx.fillStyle = this.color;
            ctx.fill();
            ctx.closePath();
        }

        // Methode zum Aktualisieren der Position und zur Kollisionserkennung
        update() {
            // Kollisionserkennung mit den Rändern des Canvas
            if (this.x + this.radius > canvas.width || this.x - this.radius < 0) {
                this.dx = -this.dx;
            }
            if (this.y + this.radius > canvas.height || this.y - this.radius < 0) {
                this.dy = -this.dy;
            }

            // Aktualisierung der Position
            this.x += this.dx;
            this.y += this.dy;

            // Zeichnen der Scheibe an der neuen Position
            this.draw();
        }
    }

    // Array zum Speichern der Scheiben
    const circles = [];

    // Funktion zum Erzeugen von 15 Scheiben mit zufälligen Eigenschaften
    const createCircles = () => {
        const colors = ['#007bff', '#28a745', '#dc3545', '#ffc107', '#17a2b8', '#6610f2', '#e83e8c', '#fd7e14', '#20c997', '#6f42c1', '#adb5bd', '#343a40', '#007bff', '#28a745', '#dc3545'];
        for (let i = 0; i < 15; i++) {
            const radius = 30;
            const x = Math.random() * (canvas.width - radius * 2) + radius;
            const y = Math.random() * (canvas.height - radius * 2) + radius;
            const dx = (Math.random() - 0.5) * 2.0;
            const dy = (Math.random() - 0.5) * 2.5;
            const color = colors[i % colors.length];
            circles.push(new Circle(x, y, radius, dx, dy, color));
        }
    };

    // Funktion für die Animationsschleife
    const animate = () => {
        // Löschen des gesamten Canvas-Bereichs
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Aktualisieren und Zeichnen jeder Scheibe im Array
        circles.forEach(circle => {
            circle.update();
        });

        // Fordert den Browser auf, das nächste Animationsframe aufzurufen
        requestAnimationFrame(animate);
    };

    // Initialisierung
    resizeCanvas();
    createCircles();
    animate();
    
    // Listener für die Größenänderung des Fensters
    window.addEventListener('resize', resizeCanvas);
    
    // Clean-up Funktion, um den Event-Listener zu entfernen, wenn die Komponente unmountet wird
    return () => {
        window.removeEventListener('resize', resizeCanvas);
    };

  }, []); // Das leere Array [] sorgt dafür, dass dieser Effekt nur einmal ausgeführt wird, wie bei componentDidMount

  return (
    <div className="flex justify-center items-center min-h-screen bg-[#f0f4f8] p-4">
      <canvas 
        ref={canvasRef} 
        className="rounded-xl shadow-lg bg-[#0d1117] max-w-full h-[calc(0vh-22rem)]"
      ></canvas>
    </div>
  );
};

