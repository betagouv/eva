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
      { libelle: "Il n'y a pas de barrière devant le parc", valeur: 'mauvaise1' },
      { libelle: 'La bouche d’égout est ouverte', valeur: 'bonne' },
      { libelle: 'Le trottoir est trop étroit', valeur: 'mauvaise2' }
    ]
  },
  [DANGER_CASQUE]: {
    qualifications: [
      { libelle: "L'homme n’a pas de gilet à haute visibilité", valeur: 'mauvaise1' },
      { libelle: "L'homme discute avec son collègue", valeur: 'bonne' },
      { libelle: "L'homme n’a pas de casque", valeur: 'mauvaise2' }
    ]
  },
  [DANGER_ESCABEAU]: {
    qualifications: [
      { libelle: "L'homme est en déséquilibre sur un escabeau", valeur: 'bonne' },
      { libelle: 'L’homme n’a pas de chaussures', valeur: 'mauvaise1' },
      { libelle: 'L’homme ne porte pas de casque', valeur: 'mauvaise2' }
    ]
  },
  [DANGER_CAMION]: {
    qualifications: [
      { libelle: 'Les piétons ne sont pas invités à changer de trottoir ', valeur: 'bonne' },
      { libelle: 'Le camion est vide', valeur: 'mauvaise1' },
      { libelle: 'Le passage piéton est jaune alors qu’il devrait être blanc', valeur: 'mauvaise2' }
    ]
  },
  [DANGER_SIGNALISATION]: {
    qualifications: [
      { libelle: 'Les deux ouvriers autorisent le passage des voitures', valeur: 'bonne' },
      { libelle: 'Les deux ouvriers sont sur la route', valeur: 'mauvaise1' },
      { libelle: 'Les deux ouvriers pourraient se faire écraser par une voiture', valeur: 'mauvaise2' }
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
    x: pourcentageX(850),
    y: pourcentageY(375),
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
  }, // personne signe gauche
  {
    x: pourcentageX(370),
    y: pourcentageY(210),
    r: pourcentageX(45)
  }, // brouette verte
  {
    x: pourcentageX(315),
    y: pourcentageY(90),
    r: pourcentageX(80)
  }, // voiture rouge
  {
    x: pourcentageX(775),
    y: pourcentageY(260),
    r: pourcentageX(50)
  }, // l'ouvrier et l'ouvrière
  {
    x: pourcentageX(590),
    y: pourcentageY(440),
    r: pourcentageX(50)
  }, // ouvrier avec brouette
  {
    x: pourcentageX(725),
    y: pourcentageY(100),
    r: pourcentageX(45)
  } // ouvrier qui perce en haut a droite
];

export { dangers, zones };
