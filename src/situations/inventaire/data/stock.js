const scene = {
  hauteur: 1536,
  largeur: 2048
};

const contenants = [

  { id: '0', idContenu: '0', type: 'ContenantVrac', forme: 'grandBaril', quantite: 25, posX: 164, posY: 365, imageOuvert: require('inventaire/assets/vrac-sky-25.png') },
  { id: '1', idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 3, posX: 412, posY: 377, imageOuvert: require('inventaire/assets/caisse-1.png') },
  { id: '2', idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 8, posX: 412, posY: 293, imageOuvert: require('inventaire/assets/caisse-2.png') },
  { id: '3', idContenu: '4', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, posX: 674, posY: 387, imageOuvert: require('inventaire/assets/gros-carton-1.png') },
  { id: '4', idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 3, posX: 970, posY: 383, imageOuvert: require('inventaire/assets/petit-carton-1.png') },
  { id: '5', idContenu: '4', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, posX: 1155, posY: 386, imageOuvert: require('inventaire/assets/gros-carton-1.png') },

  { id: '6', idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 6, posX: 166, posY: 680, imageOuvert: require('inventaire/assets/caisse-3.png') },
  { id: '7', idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 3, posX: 405, posY: 690, imageOuvert: require('inventaire/assets/caisse-5.png') },
  { id: '8', idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 7, posX: 440, posY: 600, imageOuvert: require('inventaire/assets/caisse-4.png') },
  { id: '9', idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 1, posX: 760, posY: 686, imageOuvert: require('inventaire/assets/caisse-6.png') },
  { id: '10', idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 5, posX: 760, posY: 605, imageOuvert: require('inventaire/assets/caisse-7.png') },
  { id: '11', idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 5, posX: 1153, posY: 686, imageOuvert: require('inventaire/assets/caisse-8.png') },

  { id: '12', idContenu: '1', type: 'ContenantVrac', forme: 'grandBaril', quantite: 33, posX: 63, posY: 1075, imageOuvert: require('inventaire/assets/vrac-terra-33.png') },
  { id: '13', idContenu: '7', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 3, posX: 260, posY: 1100, imageOuvert: require('inventaire/assets/gros-carton-3.png') },
  { id: '14', idContenu: '5', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 4, posX: 260, posY: 940, imageOuvert: require('inventaire/assets/gros-carton-4.png') },
  { id: '15', idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, posX: 460, posY: 1110, imageOuvert: require('inventaire/assets/caisse-9.png') },
  { id: '16', idContenu: '5', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 2, posX: 675, posY: 1100, imageOuvert: require('inventaire/assets/gros-carton-2.png') },
  { id: '17', idContenu: '7', type: 'ContenantUnitaire', forme: 'grandCarton', quantite: 2, posX: 960, posY: 1100, imageOuvert: require('inventaire/assets/gros-carton-5.png') },
  { id: '18', idContenu: '3', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, posX: 1235, posY: 1095, imageOuvert: require('inventaire/assets/caisse-12.png') },
  { id: '19', idContenu: '2', type: 'ContenantUnitaire', forme: 'caisse', quantite: 1, posX: 1235, posY: 1010, imageOuvert: require('inventaire/assets/caisse-11.png') },
  { id: '20', idContenu: '6', type: 'ContenantUnitaire', forme: 'caisse', quantite: 4, posX: 1235, posY: 930, imageOuvert: require('inventaire/assets/caisse-10.png') },

  { id: '20', idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 2, posX: 40, posY: 1420, imageOuvert: require('inventaire/assets/petit-carton-2.png') },
  { id: '21', idContenu: '4', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 1, posX: 230, posY: 1420, imageOuvert: require('inventaire/assets/petit-carton-3.png') },
  { id: '22', idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 4, posX: 410, posY: 1420, imageOuvert: require('inventaire/assets/petit-carton-4.png') },
  { id: '23', idContenu: '7', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 3, posX: 600, posY: 1420, imageOuvert: require('inventaire/assets/petit-carton-5.png') },
  { id: '24', idContenu: '7', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 0, posX: 600, posY: 1330, imageOuvert: require('inventaire/assets/petit-carton-vide.png') },
  { id: '25', idContenu: '0', type: 'ContenantVrac', forme: 'petitBaril', quantite: 8, posX: 860, posY: 1365, imageOuvert: require('inventaire/assets/vrac-sky-8.png') },
  { id: '26', idContenu: '0', type: 'ContenantVrac', forme: 'petitBaril', quantite: 13, posX: 799, posY: 1407, imageOuvert: require('inventaire/assets/vrac-sky-13.png') },
  { id: '27', idContenu: '5', type: 'ContenantUnitaire', forme: 'petitCarton', quantite: 2, posX: 920, posY: 1420, imageOuvert: require('inventaire/assets/petit-carton-6.png') },
  { id: '28', idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 7, posX: 1195, posY: 1366, imageOuvert: require('inventaire/assets/vrac-terra-7.png') },
  { id: '29', idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 3, posX: 1115, posY: 1419, imageOuvert: require('inventaire/assets/vrac-terra-3.png') },
  { id: '30', idContenu: '1', type: 'ContenantVrac', forme: 'petitBaril', quantite: 4, posX: 1267, posY: 1407, imageOuvert: require('inventaire/assets/vrac-terra-4.png') }

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
  'grandBaril': { 'largeur': 233, 'hauteur': 260, 'profondeur': 0, dimensionsOuvert: { largeur: 558, hauteur: 398 } },
  'petitBaril': { 'largeur': 117, 'hauteur': 128, 'profondeur': 0, dimensionsOuvert: { largeur: 558, hauteur: 398 } },
  'caisse': { 'largeur': 187, 'hauteur': 82, 'profondeur': 95, dimensionsOuvert: { largeur: 599, hauteur: 469 } },
  'grandCarton': { 'largeur': 269, 'hauteur': 158, 'profondeur': 90, dimensionsOuvert: { largeur: 831, hauteur: 618 } },
  'petitCarton': { 'largeur': 170, 'hauteur': 90, 'profondeur': 75, dimensionsOuvert: { largeur: 723, hauteur: 526 } }
};

export { scene, contenants, contenus, formes };
