// Generiert eine zufällige RGB-Farbe mit einem Alpha-Wert
export const getRandomRgba = () => {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = Math.floor(Math.random() * 256);
  // Der Alpha-Wert (a) wurde auf 0.5 gesetzt, um Transparenz zu erreichen
  return `rgba(${r}, ${g}, ${b}, 0.5)`;
};
