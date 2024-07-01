const N1Rrn1 = {
  id: 'N1Rrn1',
  nom_technique: 'N1Rrn1',
  type: 'qcm',
  intitule: 'Rattrapage Reconnaître les nombres : Niveau 1 Question 1',
  score: 1,
  choix: [
    {
      id: 'N1Rrn1R1',
      nom_technique: 'N1Rrn1R1',
      bonneReponse: true,
      intitule: "Bonne Réponse",
    },
    {
      id: 'N1Rrn1R2',
      nom_technique: 'N1Rrn1R2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const N1Rrn2 = {
  id: 'N1Rrn2',
  nom_technique: 'N1Rrn2',
  type: 'qcm',
  intitule: 'Rattrapage Reconnaître les nombres : Niveau 1 Question 2',
  score: 1,
  choix: [
    {
      id: 'N1Rrn2R1',
      nom_technique: 'N1Rrn2R1',
      bonneReponse: true,
      intitule: "Bonne Réponse",
    },
    {
      id: 'N1Rrn2R2',
      nom_technique: 'N1Rrn2R2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const N1Rrn = {
  series: [
    { cartes: [ N1Rrn1, N1Rrn2 ] },
  ]
};

export { N1Rrn };
