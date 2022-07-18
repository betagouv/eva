import MaisonRouge from '../assets/maison_rouge.png';
import AccueilSansEglise from '../assets/accueil_sans_eglise.png';
import SaisieBoulangerie from '../assets/saisie_boulangerie.png';
import IllustrationDragAndDrop from '../assets/drag_and_drop.png';
import DeplacementDroiteMaisonVerte from '../assets/deplacement_droite_maison_verte.png';
import rouge from '../assets/rouge.svg';
import vert from '../assets/vert.svg';
import bleu from '../assets/bleu.svg';
import { estMobile } from 'commun/helpers/mobile';


const modeEmploi = {
  id: 'mode-emploi',
  nom_technique: 'mode_emploi',
  type: 'sous-consigne',
  illustration: AccueilSansEglise,
  intitule: 'Pour écouter ou réécouter la question et les réponses, cliquez sur le bouton « Lecture » ( <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" fill="#6e84fe" r="10"/><path d="M14 8.701c1 .577 1 2.02 0 2.598l-5.813 3.356a1.5 1.5 0 0 1-2.25-1.3v-6.71a1.5 1.5 0 0 1 2.25-1.3z" fill="#fff"/></svg> ) à gauche de la phrase que vous souhaitez entendre.',
  modalite_reponse: 'Essayez avec le bouton en haut à gauche de ce cadre.<br><br>Lorsque vous aurez testé le bouton « Lecture », cliquez sur « Suivant »',
  extensionVue: 'mode-emploi'
};

const clicMaisonBleue = {
  id: 'clic-maison-bleue',
  type: 'action',
  nom_technique: 'clic_maison_bleue',
  nom_technique_mini_tuto: estMobile ? undefined : 'clic_maison_bleue',
  illustration: AccueilSansEglise,
  intitule: 'Cliquez sur la maison bleue',
  extensionVue: 'clic-maison-bleue'
};

const dragAndDrop = {
  id: 'drag-and-drop',
  type: 'action',
  nom_technique: estMobile ? 'drag_and_drop_mobile' : 'drag_and_drop',
  nom_technique_mini_tuto: estMobile ? undefined : 'drag_and_drop',
  illustration: IllustrationDragAndDrop,
  intitule: 'Super ! Maintenant, ajoutez une maison au village.',
  modalite_reponse: estMobile ?
    "Pour cela, posez votre doigt sur la maison dans le cadre blanc, et sans lever votre doigt, glissez jusqu'à la zone disponible." :
    "Pour cela cliquez sur la maison dans le cadre blanc, maintenez le bouton gauche de la souris enfoncé et glissez la dans la zone disponible.<br><br>Consultez l’exemple ci-dessous.",
  extensionVue: 'drag-and-drop'
};

const questionCouleur = {
  id: 'couleur-maison',
  nom_technique: 'couleur_maison',
  type: 'qcm',
  intitule: 'La maison est rouge',
  illustration: MaisonRouge,
  modalite_reponse: 'Cliquez sur la case qui correspond à la couleur de la maison puis sur « Valider ».',
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
  type: 'champ-saisie',
  sous_type: 'texte',
  reponse: {
    textes: ['boulangerie']
  },
  illustration: SaisieBoulangerie,
  intitule: 'Recopiez le nom « Boulangerie » dans le cadre de texte ci-dessous, puis cliquez sur « Valider »'
};

const deplacementDroiteMaisonVerte = {
  id: 'deplacement-droite-maison-verte',
  type: 'action',
  nom_technique: 'deplacement_droite_maison_verte',
  nom_technique_mini_tuto: estMobile ? undefined : 'deplacement_droite_maison_verte',
  illustration: DeplacementDroiteMaisonVerte,
  intitule: 'Dans quelle direction le personnage situé au milieu de l’écran doit-il aller pour se rendre à la maison verte ?',
  modalite_reponse: 'Pour répondre, appuyez sur la flèche gauche ou droite de votre clavier.<br><br>Sur tablette, les boutons affichés vous permettent de déplacer le personnage. Le bouton vert pour aller à gauche et le bouton rouge pour aller à droite.',
  extensionVue: 'deplacement-droite-maison-verte'
};

const configurationNormale = {
  questions: [modeEmploi, clicMaisonBleue, dragAndDrop, saisieBoulangerie, deplacementDroiteMaisonVerte, questionCouleur]
};

export { configurationNormale };
