import listeTitresMusique from '../assets/liste_titres_musique.png';

const titre1 = {
  id: 'titre1',
  nom_technique: 'titre_1',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 1, quel est la bonne lecture ? ',
  intitule: 'Dès que vous aurez reconnu la bonne lecture, choisissez  une de ces réponses en cliquant sur une des cases. Pour confirmer votre réponse, cliquer sur Valider.',
  choix: [
    {
      id: 'bax',
      nom_technique: 'bax',
      bonneReponse: false
    },
    {
      id: 'masse',
      nom_technique: 'masse',
      bonneReponse: false
    },
    {
      id: 'max',
      nom_technique: 'max',
      bonneReponse: true
    }
  ]
};

const configurationNormale = {
  questions: [titre1]
};

export { configurationNormale };
