// circles

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
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = this.color;
    ctx.fill();
    ctx.closePath();
  }

  // Methode zum Aktualisieren der Position und zur Kollisionserkennung
  update({ canvas, ctx }) {
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
    this.draw(ctx);
  }
}


// Array zum Speichern der Scheiben
export const circles = [];


// Funktion zum Erzeugen von 15 Scheiben mit zufälligen Eigenschaften
export const createCircles = ({ canvas }) => {
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