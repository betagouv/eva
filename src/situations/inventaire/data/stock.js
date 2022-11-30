const scene = {
  hauteur: 1536,
  largeur: 2736,
  positionXEtageres: 185
};

const couleurs = {
  noir: '#515d68',
  marron: '#ae855c',
  bleu: '#3c709f',
  jaune: '#a6aa3f',
  rouge: '#ae352d',
  vert: '#3c9f4f'
};

const contenants = [
  { id: '0', idContenu: '0', type: 'ContenantVrac', forme: 'grandBaril', quantite: 25, posX: 105, posY: 365, imageOuvert: require('inventaire/assets/vrac-sky-25.png'), couleur: couleurs.bleu },
  { id: '2', idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 8, posX: 353, posY: 293, imageOuvert: require('inventaire/assets/caisse-2.png'), couleur: couleurs.noir },
  { id: '3', idContenu: '4', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, posX: 615, posY: 387, imageOuvert: require('inventaire/assets/gros-carton-1.png'), couleur: couleurs.marron },
  { id: '4', idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 3, posX: 911, posY: 383, imageOuvert: require('inventaire/assets/petit-carton-1.png'), couleur: couleurs.marron },

  { id: '6', idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 6, posX: 107, posY: 680, imageOuvert: require('inventaire/assets/caisse-3.png'), couleur: couleurs.noir },
  { id: '7', idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 3, posX: 346, posY: 690, imageOuvert: require('inventaire/assets/caisse-5.png'), couleur: couleurs.rouge },
  { id: '9', idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 1, posX: 701, posY: 686, imageOuvert: require('inventaire/assets/caisse-6.png'), couleur: couleurs.noir },
  { id: '10', idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 5, posX: 701, posY: 605, imageOuvert: require('inventaire/assets/caisse-7.png'), couleur: couleurs.noir },

  { id: '12', idContenu: '1', type: 'ContenantVrac', forme: 'grandBaril', quantite: 33, posX: 4, posY: 1075, imageOuvert: require('inventaire/assets/vrac-terra-33.png'), couleur: couleurs.vert },
  { id: '13', idContenu: '7', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 3, posX: 201, posY: 1100, imageOuvert: require('inventaire/assets/gros-carton-3.png'), couleur: couleurs.marron },
  { id: '14', idContenu: '5', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, posX: 201, posY: 940, imageOuvert: require('inventaire/assets/gros-carton-4.png'), couleur: couleurs.marron },
  { id: '16', idContenu: '5', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 2, posX: 616, posY: 1100, imageOuvert: require('inventaire/assets/gros-carton-2.png'), couleur: couleurs.marron },
  { id: '17', idContenu: '7', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 2, posX: 901, posY: 1100, imageOuvert: require('inventaire/assets/gros-carton-5.png'), couleur: couleurs.marron },
  { id: '19', idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 1, posX: 1176, posY: 1010, imageOuvert: require('inventaire/assets/caisse-11.png'), couleur: couleurs.jaune },

  { id: '21', idContenu: '4', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 1, posX: 171, posY: 1420, imageOuvert: require('inventaire/assets/petit-carton-3.png'), couleur: couleurs.marron },
  { id: '22', idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 4, posX: 351, posY: 1420, imageOuvert: require('inventaire/assets/petit-carton-4.png'), couleur: couleurs.marron },
  { id: '26', idContenu: '0', type: 'ContenantVrac', forme: 'petitBaril', quantite: 13, posX: 821, posY: 1380, imageOuvert: require('inventaire/assets/vrac-sky-13.png'), couleur: couleurs.bleu },
  { id: '28', idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 7, posX: 1096, posY: 1395, imageOuvert: require('inventaire/assets/vrac-terra-7.png'), couleur: couleurs.vert },
  { id: '30', idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 4, posX: 1329, posY: 1365, imageOuvert: require('inventaire/assets/vrac-terra-4.png'), couleur: couleurs.vert }
];

const contenus = {
  0: { nom: 'Vrac SKY', image: require('inventaire/assets/bidon_bleu.png'), forme: 'bidon', position: 7 },
  1: { nom: 'Vrac TERRA', image: require('inventaire/assets/bidon_vert.png'), forme: 'bidon', position: 8 },
  2: { nom: 'Premium Terra', image: require('inventaire/assets/premterra.png'), forme: 'petiteBouteille', position: 6 },
  3: { nom: 'Nova Sky', image: require('inventaire/assets/novasky.png'), forme: 'petiteBouteille', position: 5 },
  4: { nom: "Gink'cola", image: require('inventaire/assets/ginkcola.png'), forme: 'grandeBouteille', position: 2 },
  5: { nom: "Lem'cola", image: require('inventaire/assets/lemcola.png'), forme: 'grandeBouteille', position: 3 },
  6: { nom: 'Terra Cola', image: require('inventaire/assets/terracola.png'), forme: 'boiteConserve', position: 4 },
  7: { nom: "O'cola", image: require('inventaire/assets/ocola.png'), forme: 'grandeBouteille', position: 1 }
};

const formes = {
  grandBaril: { largeur: 233, hauteur: 260, profondeur: 0, courbe: 40, dimensionsOuvert: { largeur: 422, hauteur: 265 } },
  petitBaril: { largeur: 117, hauteur: 128, profondeur: 0, courbe: 20, dimensionsOuvert: { largeur: 422, hauteur: 265 } },
  caisse: { largeur: 187, hauteur: 82, profondeur: 95, courbe: 0, dimensionsOuvert: { largeur: 463, hauteur: 336 } },
  grandCarton: { largeur: 269, hauteur: 158, profondeur: 90, courbe: 0, dimensionsOuvert: { largeur: 695, hauteur: 484 } },
  petitCarton: { largeur: 170, hauteur: 90, profondeur: 75, courbe: 0, dimensionsOuvert: { largeur: 587, hauteur: 391 } }
};

export { scene, contenants, contenus, formes };
