import MaisonRouge from '../assets/maison_rouge.png';

const questionCouleur = {
  id: 'couleur-maison',
  nom_technique: 'couleur_maison',
  description: 'La maison est rouge',
  illustration: MaisonRouge,
  intitule: 'Cliquez sur la case qui correspond à la couleur de la maison puis sur Valider.',
  choix: [
    {
      id: 'rouge',
      intitule: 'rouge',
      bonneReponse: true
    },
    {
      id: 'bleu',
      intitule: 'bleu',
      bonneReponse: false
    },
    {
      id: 'vert',
      intitule: 'vert',
      bonneReponse: false
    }
  ]
};

const configurationNormale = {
  questions: [questionCouleur]
};

export { configurationNormale };
