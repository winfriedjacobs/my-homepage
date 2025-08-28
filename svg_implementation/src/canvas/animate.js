// Funktion für die Animationsschleife

export const basicAnimate = (canvas, circles, ctx) => {
  // Löschen des gesamten Canvas-Bereichs
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Aktualisieren und Zeichnen jeder Scheibe im Array
  circles.forEach((circle) => {
    circle.update({ canvas, ctx });
  });
};
