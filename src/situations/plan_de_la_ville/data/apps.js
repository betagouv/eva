import MaisonRouge from '../assets/maison_rouge.png';
import AccueilSansEglise from '../assets/accueil_sans_eglise.png';
import SaisieBoulangerie from '../assets/saisie_boulangerie.png';
import IllustrationDragAndDrop from '../assets/drag_and_drop.png';
import rouge from '../assets/rouge.svg';
import vert from '../assets/vert.svg';
import bleu from '../assets/bleu.svg';

const clicMaisonBleue = {
  id: 'clic-maison-bleue',
  type: 'action',
  nom_technique: 'clic_maison_bleue',
  illustration: AccueilSansEglise,
  intitule: 'Cliquez sur la maison bleue',
  extensionVue: 'clic-maison-bleue',
  choix: []
};

const dragAndDrop = {
  id: 'drag-and-drop',
  type: 'action',
  nom_technique: 'drag_and_drop',
  illustration: IllustrationDragAndDrop,
  description: 'Super ! Maintenant, ajoutez une maison au village.',
  intitule: 'Pour cela cliquez sur la maison en dessous de la carte, maintenez le bouton gauche de la souris enfoncée et glissez là dans la zone disponible. Consultez l’exemple ci-dessous.',
  extensionVue: 'drag-and-drop',
  choix: []
};

const questionCouleur = {
  id: 'couleur-maison',
  nom_technique: 'couleur_maison',
  description: 'La maison est rouge',
  illustration: MaisonRouge,
  intitule: 'Cliquez sur la case qui correspond à la couleur de la maison puis sur Valider.',
  choix: [
    {
      id: 'rouge',
      nom_technique: 'rouge',
      image: rouge,
      bonneReponse: true
    },
    {
      id: 'bleu',
      nom_technique: 'bleu',
      image: bleu,
      bonneReponse: false
    },
    {
      id: 'vert',
      nom_technique: 'vert',
      image: vert,
      bonneReponse: false
    }
  ]
};

const saisieBoulangerie = {
  id: 'saisie-boulangerie',
  nom_technique: 'saisie_boulangerie',
  type: 'texte',
  bonneReponse: 'boulangerie',
  illustration: SaisieBoulangerie,
  intitule: 'Recopiez le nom “Boulangerie” dans le cadre de texte ci-dessous, puis cliquez sur Valider',
  choix: []
};

const configurationNormale = {
  questions: [clicMaisonBleue, dragAndDrop, questionCouleur, saisieBoulangerie]
};

export { configurationNormale };
