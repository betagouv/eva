export const scene = {
  largeur: 1008,
  hauteur: 566
};

export function pourcentageX (valeur) {
  return valeur / scene.largeur * 100;
}

export function pourcentageY (valeur) {
  return valeur / scene.hauteur * 100;
}
