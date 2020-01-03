const scene = {
  largeur: 1008,
  hauteur: 566
};

export function pourcentageX (valeur) {
  return valeur / scene.largeur * 100;
}

export function pourcentageY (valeur) {
  return valeur / scene.hauteur * 100;
}

const configurationEntrainement = { zones: [] };
const configurationNormale = {
  zones: [
    {
      x: pourcentageX(260),
      y: pourcentageY(280),
      r: pourcentageX(200),
      id: 'zone1'
    }
  ]
};

export { configurationEntrainement, configurationNormale };
