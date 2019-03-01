const scene = {
  hauteur: 1536,
  largeur: 2048
};

const contenants = [

  { idContenu: '0', type: 'ContenantVrac', forme: 'grandBaril', quantite: 25, posX: 164, posY: 365 },
  { idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 3, couleur: 'gris', posX: 412, posY: 377 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 8, couleur: 'gris', posX: 412, posY: 293 },
  { idContenu: '4', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, couleur: 'marron', posX: 1155, posY: 386 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 3, couleur: 'marron', posX: 970, posY: 383 },
  { idContenu: '4', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, couleur: 'marron', posX: 674, posY: 387 },

  { idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 6, couleur: 'gris', posX: 166, posY: 680 },
  { idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 3, couleur: 'rouge', posX: 405, posY: 690 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 7, couleur: 'bleu', posX: 440, posY: 600 },
  { idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 1, couleur: 'gris', posX: 760, posY: 686 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 5, couleur: 'gris', posX: 760, posY: 605 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 5, couleur: 'bleu', posX: 1153, posY: 686 },

  { idContenu: '1', type: 'ContenantVrac', forme: 'grandBaril', quantite: 33, posX: 63, posY: 1075 },
  { idContenu: '7', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 3, couleur: 'marron', posX: 260, posY: 1100 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, couleur: 'marron', posX: 260, posY: 940 },
  { idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, couleur: 'gris', posX: 460, posY: 1110 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 2, couleur: 'marron', posX: 675, posY: 1100 },
  { idContenu: '7', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 2, couleur: 'marron', posX: 960, posY: 1100 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, couleur: 'vert', posX: 1235, posY: 1095 },
  { idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 1, couleur: 'jaune', posX: 1235, posY: 1010 },
  { idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, couleur: 'bleu', posX: 1235, posY: 930 },

  { idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 2, couleur: 'marron', posX: 40, posY: 1420 },
  { idContenu: '4', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 1, couleur: 'marron', posX: 230, posY: 1420 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 4, couleur: 'marron', posX: 410, posY: 1420 },
  { idContenu: '7', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 3, couleur: 'marron', posX: 600, posY: 1420 },
  { idContenu: '7', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 0, couleur: 'marron', posX: 600, posY: 1330 },
  { idContenu: '0', type: 'ContenantVrac', forme: 'petitBaril', quantite: 8, posX: 860, posY: 1365 },
  { idContenu: '0', type: 'ContenantVrac', forme: 'petitBaril', quantite: 13, posX: 799, posY: 1407 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 2, couleur: 'marron', posX: 920, posY: 1420 },
  { idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 7, posX: 1195, posY: 1366 },
  { idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 3, posX: 1115, posY: 1419 },
  { idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 4, posX: 1267, posY: 1407 }
];

const contenus = {
  '0': { nom: 'Vrac SKY', image: require('inventaire/assets/bidon_bleu.png') },
  '1': { nom: 'Vrac TERRA', image: require('inventaire/assets/bidon_vert.png') },
  '2': { nom: 'Premium Terra', image: require('inventaire/assets/premterra.png') },
  '3': { nom: 'Nova Sky', image: require('inventaire/assets/novasky.png') },
  '4': { nom: "Gink'cola", image: require('inventaire/assets/ginkcola.png') },
  '5': { nom: "Lem'cola", image: require('inventaire/assets/lemcola.png') },
  '6': { nom: 'Terra Cola', image: require('inventaire/assets/terracola.png') },
  '7': { nom: "O'cola", image: require('inventaire/assets/ocola.png') }
};

const formes = {
  'grandBaril': { 'largeur': 233, 'hauteur': 260, 'profondeur': 0 },
  'petitBaril': { 'largeur': 117, 'hauteur': 128, 'profondeur': 0 },
  'caisse': { 'largeur': 187, 'hauteur': 82, 'profondeur': 95 },
  'grandCarton': { 'largeur': 269, 'hauteur': 158, 'profondeur': 90 },
  'petitCarton': { 'largeur': 170, 'hauteur': 90, 'profondeur': 75 }
};

export { scene, contenants, contenus, formes };
