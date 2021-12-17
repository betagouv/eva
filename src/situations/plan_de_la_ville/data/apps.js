import MaisonRouge from '../assets/maison_rouge.png';
import rouge from '../assets/rouge.svg';
import vert from '../assets/vert.svg';
import bleu from '../assets/bleu.svg';

const questionCouleur = {
  id: 'couleur-maison',
  nom_technique: 'couleur_maison',
  description: 'La maison est rouge',
  illustration: MaisonRouge,
  intitule: 'Cliquez sur la case qui correspond à la couleur de la maison puis sur Valider.',
  choix: [
    {
      id: 'rouge',
      image: rouge,
      bonneReponse: true
    },
    {
      id: 'bleu',
      image: bleu,
      bonneReponse: false
    },
    {
      id: 'vert',
      image: vert,
      bonneReponse: false
    }
  ]
};

const configurationNormale = {
  questions: [questionCouleur]
};

export { configurationNormale };
