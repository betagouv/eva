const contenants = [
  { idContenu: '0', type: 'ContenantVrac', forme: 'moyenBaril', quantite: 25, posX: 7.3, posY: 3.0 },
  { idContenu: '1', type: 'ContenantVrac', forme: 'grandBaril', quantite: 33, posX: 4.4, posY: 56.0 },
  { idContenu: '0', type: 'ContenantVrac', forme: 'petitBaril', quantite: 8, posX: 52.8, posY: 87.0 },
  { idContenu: '0', type: 'ContenantVrac', forme: 'petitBaril', quantite: 13, posX: 59.6, posY: 87.5 },
  { idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 7, posX: 86, posY: 87.0 },
  { idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 3, posX: 81.7, posY: 89.0 },
  { idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 4, posX: 91.2, posY: 88.5 },
  { idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 3, couleur: 'gris', posX: 18.4, posY: 11.2 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', couleur: 'gris', quantite: 8, posX: 18.4, posY: 3.0 },
  { idContenu: '4', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, couleur: 'marron', posX: 52.4, posY: 5.4 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 3, couleur: 'marron', posX: 70.8, posY: 11.7 },
  { idContenu: '4', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, couleur: 'marron', posX: 81.0, posY: 5.9 },
  { idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 6, couleur: 'gris', posX: 3.7, posY: 33.3 },
  { idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 3, couleur: 'rouge', posX: 26.5, posY: 33.8 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 7, couleur: 'bleu', posX: 26.5, posY: 25.9 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 5, couleur: 'gris', posX: 52.4, posY: 33.8 },
  { idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 1, couleur: 'gris', posX: 52.4, posY: 25.9 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 5, couleur: 'bleu', posX: 80.3, posY: 33.8 },
  { idContenu: '7', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 3, couleur: 'marron', posX: 16.0, posY: 62.6 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, couleur: 'marron', posX: 18.0, posY: 49.4 },
  { idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, couleur: 'gris', posX: 32.7, posY: 68.5 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'moyenCarton', quantite: 2, couleur: 'marron', posX: 51.7, posY: 64.5 },
  { idContenu: '7', type: 'ContenantUnitaire', forme: 'moyenCarton', quantite: 2, couleur: 'marron', posX: 65.7, posY: 64.5 },
  { idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, couleur: 'vert', posX: 80.3, posY: 69.9 },
  { idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 1, couleur: 'jaune', posX: 80.3, posY: 62.1 },
  { idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, couleur: 'bleu', posX: 80.3, posY: 55.0 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 2, couleur: 'marron', posX: 3.4, posY: 89.2 },
  { idContenu: '4', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 1, couleur: 'marron', posX: 12.6, posY: 89.2 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 4, couleur: 'marron', posX: 21.8, posY: 89.2 },
  { idContenu: '7', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 0, couleur: 'marron', posX: 31.0, posY: 89.2 },
  { idContenu: '7', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 3, couleur: 'marron', posX: 40.2, posY: 89.2 },
  { idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 2, couleur: 'marron', posX: 66.7, posY: 89.2 }
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
  'moyenBaril': { 'largeur': 9.2, 'hauteur': 17.6 },
  'grandBaril': { 'largeur': 11, 'hauteur': 22 },
  'petitBaril': { 'largeur': 5.7, 'hauteur': 11.5 },
  'caisse': { 'largeur': 16.3, 'hauteur': 9.7 },
  'grandCarton': { 'largeur': 16, 'hauteur': 15.4 },
  'moyenCarton': { 'largeur': 14, 'hauteur': 13.9 },
  'petitCarton': { 'largeur': 9, 'hauteur': 9.5 }
};

export { contenants, contenus, formes };
