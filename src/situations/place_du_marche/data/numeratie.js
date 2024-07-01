// NUMERATIE NIVEAU 1

// Module Situation dans l'espace
const N1Pse1 = {
  id: 'N1Pse1',
  nom_technique: 'N1Pse1',
  type: 'qcm',
  intitule: "Situation dans l'espace : Niveau 1 Question 1",
  score: 0.5,
  choix: [
    {
      id: 'N1Pse1R1',
      nom_technique: 'N1Pse1R1',
      bonneReponse: true,
      intitule: "Bonne Réponse",
    },
    {
      id: 'N1Pse1R2',
      nom_technique: 'N1Pse1R2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const N1Pse2 = {
  id: 'N1Pse2',
  nom_technique: 'N1Pse2',
  type: 'qcm',
  intitule: "Situation dans l'espace : Niveau 1 Question 2",
  score: 0.5,
  choix: [
    {
      id: 'N1Pse2R1',
      nom_technique: 'N1Pse2R1',
      bonneReponse: true,
      intitule: "Bonne Réponse",
    },
    {
      id: 'N1Pse2R2',
      nom_technique: 'N1Pse2R2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const N1Pse3 = {
  id: 'N1Pse3',
  nom_technique: 'N1Pse3',
  type: 'qcm',
  intitule: "Situation dans l'espace : Niveau 1 Question 3",
  score: 0.5,
  choix: [
    {
      id: 'N1Pse3R1',
      nom_technique: 'N1Pse3R1',
      bonneReponse: true,
      intitule: "Bonne Réponse",
    },
    {
      id: 'N1Pse3R2',
      nom_technique: 'N1Pse3R2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const N1Pse4 = {
  id: 'N1Pse4',
  nom_technique: 'N1Pse4',
  type: 'qcm',
  intitule: "Situation dans l'espace : Niveau 1 Question 4",
  score: 0.5,
  choix: [
    {
      id: 'N1Pse4R1',
      nom_technique: 'N1Pse4R1',
      bonneReponse: true,
      intitule: "Bonne Réponse",
    },
    {
      id: 'N1Pse4R2',
      nom_technique: 'N1Pse4R2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

// Module reconnaître les nombres

const N1Prn1 = {
  id: 'N1Prn1',
  nom_technique: 'N1Prn1',
  type: 'qcm',
  intitule: 'Reconnaître les nombres : Niveau 1 Question 1',
  score: 1,
  choix: [
    {
      id: 'N1Prn1R1',
      nom_technique: 'N1Prn1R1',
      bonneReponse: true,
      intitule: "Bonne Réponse",
    },
    {
      id: 'N1Prn1R2',
      nom_technique: 'N1Prn1R2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

const N1Prn2 = {
  id: 'N1Prn2',
  nom_technique: 'N1Prn2',
  type: 'qcm',
  intitule: 'Reconnaître les nombres : Niveau 1 Question 2',
  score: 1,
  choix: [
    {
      id: 'N1Prn2R1',
      nom_technique: 'N1Prn2R1',
      bonneReponse: true,
      intitule: "Bonne Réponse",
    },
    {
      id: 'N1Prn2R2',
      nom_technique: 'N1Prn2R2',
      bonneReponse: false,
      intitule: "Mauvaise Réponse",
    }
  ]
};

// NUMERATIE NIVEAU 2

const niveau_2_1 = {
  id: 'NumeratieN2Q1',
  nom_technique: 'numeratie_n2_q1',
  type: 'qcm',
  intitule: 'Niveau 2 Question 1',
  score: 0.5,
  choix: [
    {
      id: 'NumeratieN2Q1R1',
      nom_technique: 'numeratie_n2_q1_r1',
      bonneReponse: true,
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

// NUMERATIE NIVEAU 3

const niveau_3_1 = {
  id: 'NumeratieN3Q1',
  nom_technique: 'numeratie_n3_q1',
  type: 'qcm',
  intitule: 'Niveau 3 Question 1',
  score: 0.5,
  choix: [
    {
      id: 'NumeratieN3Q1R1',
      nom_technique: 'numeratie_n3_q1_r1',
      bonneReponse: true,
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

const niveau1 = {
  series: [
    { cartes: [ N1Pse1, N1Pse2, N1Pse3, N1Pse4] },
    { cartes: [ N1Prn1, N1Prn2] },
  ]
};

const niveau2 = {
  series: [
    { cartes: [ niveau_2_1] },
  ]
};

const niveau3 = {
  series: [
    { cartes: [ niveau_3_1] }
  ]
};

export { niveau1, niveau2, niveau3 };
