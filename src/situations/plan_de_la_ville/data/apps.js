import MaisonRouge from '../assets/maison_rouge.png';
import AccueilSansEglise from '../assets/accueil_sans_eglise.png';
import SaisieBoulangerie from '../assets/saisie_boulangerie.png';
import IllustrationDragAndDrop from '../assets/drag_and_drop.png';
import DeplacementDroiteMaisonVerte from '../assets/deplacement_droite_maison_verte.png';
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
  intitule: 'Pour cela cliquez sur la maison en dessous de la carte, maintenez le bouton gauche de la souris enfoncée et glissez là dans la zone disponible.<br><br>Consultez l’exemple ci-dessous.',
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

const deplacementDroiteMaisonVerte = {
  id: 'deplacement-droite-maison-verte',
  type: 'action',
  nom_technique: 'deplacement_droite_maison_verte',
  illustration: DeplacementDroiteMaisonVerte,
  description: 'Dans quelle direction le personnage situé au milieu de l’écran doit-il aller pour se rendre à la maison verte ?',
  intitule: 'Pour répondre, appuyez sur la flèche gauche ou droite de votre clavier.',
  extensionVue: 'deplacement-droite-maison-verte',
  choix: []
};

const configurationNormale = {
  questions: [clicMaisonBleue, dragAndDrop, saisieBoulangerie, deplacementDroiteMaisonVerte, questionCouleur]
};

export { configurationNormale };
