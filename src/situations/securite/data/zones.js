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

const DANGER_BOUCHE_EGOUT = 'bouche-egout';
const DANGER_CASQUE = 'casque';
const DANGER_ESCABEAU = 'escabeau';
const DANGER_CAMION = 'camion';
const DANGER_SIGNALISATION = 'signalisation';

const dangers = {
  [DANGER_BOUCHE_EGOUT]: {
    qualifications: [
      { libelle: 'Des rats peuvent sortir', valeur: 'mauvaise1' },
      { libelle: "Quelqu'un peut sortir", valeur: 'mauvaise2' },
      { libelle: 'On peut tomber dans le trou', valeur: 'bonne' }
    ]
  },
  [DANGER_CASQUE]: {
    qualifications: [
      { libelle: "L'homme est devant une sortie de garage", valeur: 'mauvaise1' },
      { libelle: "L'homme pourrait se blesser à la tête", valeur: 'bonne' },
      { libelle: "L'homme pourrait être maladroit", valeur: 'mauvaise2' }
    ]
  },
  [DANGER_ESCABEAU]: {
    qualifications: [
      { libelle: "L'homme est monté trop haut", valeur: 'bonne' },
      { libelle: "l'escabeau pourrait tomber", valeur: 'mauvaise1' }
    ]
  },
  [DANGER_CAMION]: {
    qualifications: [
      { libelle: 'Le camion empêche la circulation des pietons sur le trottoire', valeur: 'bonne' },
      { libelle: "Le camion n'a pas ses warnings", valeur: 'mauvaise1' },
      { libelle: 'Le camion pourrait écraser un pieton', valeur: 'mauvaise2' }
    ]
  },
  [DANGER_SIGNALISATION]: {
    qualifications: [
      { libelle: 'Les deux ouvriers autorisent le passage des voitures', valeur: 'bonne' },
      { libelle: 'Le tas de terre empèche les voitures de passer', valeur: 'mauvaise1' },
      { libelle: "L'ouvrier pourrait se faire écraser par une voiture", valeur: 'mauvaise2' }
    ]
  }
};

const zones = [
  {
    x: pourcentageX(155),
    y: pourcentageY(475),
    r: pourcentageX(45),
    danger: DANGER_BOUCHE_EGOUT
  },
  {
    x: pourcentageX(435),
    y: pourcentageY(230),
    r: pourcentageX(45),
    danger: DANGER_CASQUE
  },
  {
    x: pourcentageX(545),
    y: pourcentageY(250),
    r: pourcentageX(90),
    danger: DANGER_ESCABEAU
  },
  {
    x: pourcentageX(825),
    y: pourcentageY(355),
    r: pourcentageX(90),
    danger: DANGER_CAMION
  },
  {
    x: pourcentageX(460),
    y: pourcentageY(420),
    r: pourcentageX(45),
    danger: DANGER_SIGNALISATION
  }, // personne signe droit
  {
    x: pourcentageX(50),
    y: pourcentageY(370),
    r: pourcentageX(45),
    danger: DANGER_SIGNALISATION
  } // personne signe gauche
];

export { dangers, zones };
