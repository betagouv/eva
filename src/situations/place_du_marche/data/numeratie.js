const niveau_1_1 = {
  id: 'NumeratieN1Q1',
  nom_technique: 'numeratie_n1_q1',
  type: 'qcm',
  intitule: 'Niveau 1 Question 1',
  choix: [
    {
      id: 'NumeratieN1Q1R1',
      nom_technique: 'numeratie_n1_q1_r1',
      bonneReponse: true,
      score: 0.5,
      intitule: "Bonne Réponse",
    },
    {
      id: 'NumeratieN1Q1R2',
      nom_technique: 'numeratie_n1_q1_r2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const niveau_1_2 = {
  id: 'NumeratieN1Q2',
  nom_technique: 'numeratie_n1_q2',
  type: 'qcm',
  intitule: 'Niveau 1 Question 2',
  choix: [
    {
      id: 'NumeratieN1Q2R1',
      nom_technique: 'numeratie_n1_q2_r1',
      bonneReponse: true,
      score: 1,
      intitule: "Bonne Réponse",
    },
    {
      id: 'NumeratieN1Q2R2',
      nom_technique: 'numeratie_n1_q2_r2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const niveau_2_1 = {
  id: 'NumeratieN2Q1',
  nom_technique: 'numeratie_n2_q1',
  type: 'qcm',
  intitule: 'Niveau 2 Question 1',
  choix: [
    {
      id: 'NumeratieN2Q1R1',
      nom_technique: 'numeratie_n2_q1_r1',
      bonneReponse: true,
      score: 0.5,
      intitule: "Bonne Réponse",
    },
    {
      id: 'NumeratieN2Q1R2',
      nom_technique: 'numeratie_n2_q1_r2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const niveau_3_1 = {
  id: 'NumeratieN3Q1',
  nom_technique: 'numeratie_n3_q1',
  type: 'qcm',
  intitule: 'Niveau 3 Question 1',
  choix: [
    {
      id: 'NumeratieN3Q1R1',
      nom_technique: 'numeratie_n3_q1_r1',
      bonneReponse: true,
      score: 0.5,
      intitule: "Bonne Réponse",
    },
    {
      id: 'NumeratieN3Q1R2',
      nom_technique: 'numeratie_n3_q1_r2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const numeratie = {
  series: [
    { cartes: [ niveau_1_1 , niveau_1_2, niveau_2_1, niveau_3_1] },
  ]
};

export { numeratie };
