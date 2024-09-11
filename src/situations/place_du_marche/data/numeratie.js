// NUMERATIE NIVEAU 1

const N1Pse1 = {
  id: 'N1Pse1',
  nom_technique: 'N1Pse1',
  metacompetence: 'situation_dans_lespace',
  score: 0.5,
};

const N1Pse2 = {
  id: 'N1Pse2',
  nom_technique: 'N1Pse2',
  metacompetence: 'situation_dans_lespace',
  score: 0.5,
};

const N1Pse3 = {
  id: 'N1Pse3',
  nom_technique: 'N1Pse3',
  metacompetence: 'situation_dans_lespace',
  score: 0.5,
};

const N1Pse4 = {
  id: 'N1Pse4',
  nom_technique: 'N1Pse4',
  metacompetence: 'situation_dans_lespace',
  score: 0.5,
};

const N1Prn1 = {
  id: 'N1Prn1',
  nom_technique: 'N1Prn1',
  metacompetence: 'reconaitre_les_nombres',
  score: 1,
};

const N1Prn2 = {
  id: 'N1Prn2',
  nom_technique: 'N1Prn2',
  metacompetence: 'reconaitre_les_nombres',
  score: 1,
};

const N1Pde1 = {
  id: 'N1Pde1',
  nom_technique: 'N1Pde1',
  metacompetence: 'denombrement',
  score: 1
};

const N1Pde2 = {
  id: 'N1Pde2',
  nom_technique: 'N1Pde2',
  metacompetence: 'denombrement',
  score: 1
};

const N1Pes1 = {
  id: 'N1Pes1',
  nom_technique: 'N1Pes1',
  metacompetence: 'estimation',
  score: 1,
};

const N1Pes2 = {
  id: 'N1Pes2',
  nom_technique: 'N1Pes2',
  metacompetence: 'estimation',
  score: 1,
};

const N1Pon1 = {
  id: 'N1Pon1',
  nom_technique: 'N1Pon1',
  metacompetence: 'ordonner_nombres_entiers',
  score: 1,
};

const N1Pon2 = {
  id: 'N1Pon2',
  nom_technique: 'N1Pon2',
  metacompetence: 'ordonner_nombres_entiers',
  score: 1,
};

const N1Poa1 = {
  id: 'N1Poa1',
  nom_technique: 'N1Poa1',
  metacompetence: 'operations_addition',
  score: 1
};

const N1Poa2 = {
  id: 'N1Poa2',
  nom_technique: 'N1Poa2',
  metacompetence: 'operations_addition',
  score: 1
};

const N1Pos1 = {
  id: 'N1Pos1',
  nom_technique: 'N1Pos1',
  metacompetence: 'operations_soustraction',
  score: 1
};

const N1Pos2 = {
  id: 'N1Pos2',
  nom_technique: 'N1Pos2',
  metacompetence: 'operations_soustraction',
  score: 1
};

const N1Pvn1 = {
  id: 'N1Pvn1',
  nom_technique: 'N1Pvn1',
  metacompetence: 'vocabulaire_numeracie',
  score: 0.5,
};

const N1Pvn2 = {
  id: 'N1Pvn2',
  nom_technique: 'N1Pvn2',
  metacompetence: 'vocabulaire_numeracie',
  score: 0.5,
};

const N1Pvn3 = {
  id: 'N1Pvn3',
  nom_technique: 'N1Pvn3',
  metacompetence: 'vocabulaire_numeracie',
  score: 0.5,
};

const N1Pvn4 = {
  id: 'N1Pvn4',
  nom_technique: 'N1Pvn4',
  metacompetence: 'vocabulaire_numeracie',
  score: 0.5,
};

// NUMERATIE NIVEAU 2

const N2PQ1 = {
  id: 'N2PQ1',
  nom_technique: 'N2PQ1',
  intitule: 'Niveau 2 Question 1',
  score: 1
};

// NUMERATIE NIVEAU 3

const N3PQ1 = {
  id: 'N3PQ1',
  nom_technique: 'N3PQ1',
  intitule: 'Niveau 3 Question 1',
  score: 1
};

const niveau1 = {
  series: [
    { cartes: [ N1Pse1, N1Pse2, N1Pse3, N1Pse4] },
    { cartes: [ N1Prn1, N1Prn2] },
    { cartes: [ N1Pde1, N1Pde2] },
    { cartes: [ N1Pes1, N1Pes2] },
    { cartes: [ N1Pon1, N1Pon2] },
    { cartes: [ N1Poa1, N1Poa2] },
    { cartes: [ N1Pos1, N1Pos2] },
    { cartes: [ N1Pvn1, N1Pvn2, N1Pvn3, N1Pvn4] }
  ]
};

const niveau2 = {
  series: [
    { cartes: [ N2PQ1] },
  ]
};

const niveau3 = {
  series: [
    { cartes: [ N3PQ1] }
  ]
};

export { niveau1, niveau2, niveau3 };
