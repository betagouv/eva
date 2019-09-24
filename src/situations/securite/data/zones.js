const scene = {
  largeur: 1008,
  hauteur: 566
};

function pourcentageX (valeur) {
  return valeur / scene.largeur * 100;
}

function pourcentageY (valeur) {
  return valeur / scene.hauteur * 100;
}

const zones = [
  { x: pourcentageX(155), y: pourcentageY(475), r: pourcentageX(45), dangereuse: true }, // bouche d'égouts
  { x: pourcentageX(435), y: pourcentageY(230), r: pourcentageX(45), dangereuse: true }, // casque
  { x: pourcentageX(545), y: pourcentageY(250), r: pourcentageX(90), dangereuse: true }, // escabeau
  { x: pourcentageX(825), y: pourcentageY(355), r: pourcentageX(90), dangereuse: true }, // camion
  { x: pourcentageX(460), y: pourcentageY(420), r: pourcentageX(45), dangereuse: true }, // personne signe droit
  { x: pourcentageX(50), y: pourcentageY(370), r: pourcentageX(45), dangereuse: true } // personne signe gauche
];

export { zones };
