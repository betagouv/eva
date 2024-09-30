import personnage from 'accueil/assets/personnage.png';

// RATTRAPAGE NUMERATIE NIVEAU 1

const N1RrnSousConsigne = {
  id: 'N1Rrn-sousConsigne',
  nom_technique: 'N1Rrn-sous-consigne',
};

const N1Rrn1 = {
  id: 'N1Rrn1',
  nom_technique: 'N1Rrn1',
  metacompetence: 'reconnaitre_les_nombres',
  score: 1,
};

const N1Rrn2 = {
  id: 'N1Rrn2',
  nom_technique: 'N1Rrn2',
  metacompetence: 'reconnaitre_les_nombres',
  score: 1,
};

const N1Rde1 = {
  id: 'N1Rde1',
  nom_technique: 'N1Rde1',
  metacompetence: 'denombrement',
  score: 1
};

const N1Rde2 = {
  id: 'N1Rde2',
  nom_technique: 'N1Rde2',
  metacompetence: 'denombrement',
  score: 1
};

const N1Res1 = {
  id: 'N1Res1',
  nom_technique: 'N1Res1',
  metacompetence: 'estimation',
  score: 1,
};

const N1Res2 = {
  id: 'N1Res2',
  nom_technique: 'N1Res2',
  metacompetence: 'estimation',
  score: 1,
};

const N1Ron1 = {
  id: 'N1Ron1',
  nom_technique: 'N1Ron1',
  metacompetence: 'ordonner_nombres_entiers',
  score: 1,
};

const N1Ron2 = {
  id: 'N1Ron2',
  nom_technique: 'N1Ron2',
  metacompetence: 'ordonner_nombres_entiers',
  score: 1,
};

const N1Roa1 = {
  id: 'N1Roa1',
  nom_technique: 'N1Roa1',
  metacompetence: 'operations_addition',
  score: 1
};

const N1Roa2 = {
  id: 'N1Roa2',
  nom_technique: 'N1Roa2',
  metacompetence: 'operations_addition',
  score: 1
};

const N1Ros1 = {
  id: 'N1Ros1',
  nom_technique: 'N1Ros1',
  metacompetence: 'operations_soustraction',
  score: 1
};

const N1Ros2 = {
  id: 'N1Ros2',
  nom_technique: 'N1Ros2',
  metacompetence: 'operations_soustraction',
  score: 1
};

// RATTRAPAGE NUMERATIE NIVEAU 2

const N2Rlp1  = {
  id: 'N2Rlp1 ',
  nom_technique: 'N2Rlp1 ',
  metacompetence: 'lecture_plan',
  score: 1,
};

const N2Rlp2  = {
  id: 'N2Rlp2 ',
  nom_technique: 'N2Rlp2 ',
  metacompetence: 'lecture_plan',
  score: 1,
};

const N2Rpe1 = {
  id: 'N2Rpe1',
  nom_technique: 'N2Rpe1',
  metacompetence: 'perimetres',
  score: 1,
};

const N2Rpe2 = {
  id: 'N2Rpe2',
  nom_technique: 'N2Rpe2',
  metacompetence: 'perimetres',
  score: 1,
};

const N2Rsu1 = {
  id: 'N2Rsu1',
  nom_technique: 'N2Rsu1',
  metacompetence: 'surfaces',
  score: 1,
};

const N2Rsu2 = {
  id: 'N2Rsu2',
  nom_technique: 'N2Rsu2',
  metacompetence: 'surfaces',
  score: 1,
};

const N2Rom1 = {
  id: 'N2Rom1',
  nom_technique: 'N2Rom1',
  metacompetence: 'operations_multiplication',
  score: 1,
};

const N2Rom2 = {
  id: 'N2Rom2',
  nom_technique: 'N2Rom2',
  metacompetence: 'operations_multiplication',
  score: 1,
};

const N2Ron1 = {
  id: 'N2Ron1',
  nom_technique: 'N2Ron1',
  metacompetence: 'operations_nombres_entiers',
  score: 1,
};

const N2Ron2 = {
  id: 'N2Ron2',
  nom_technique: 'N2Ron2',
  metacompetence: 'operations_nombres_entiers',
  score: 1,
};

const N2Rod1 = {
  id: 'N2Rod1',
  nom_technique: 'N2Rod1',
  metacompetence: 'operations_division',
  score: 1,
};

const N2Rod2 = {
  id: 'N2Rod2',
  nom_technique: 'N2Rod2',
  metacompetence: 'operations_division',
  score: 1,
};

const N2Rut1 = {
  id: 'N2Rut1',
  nom_technique: 'N2Rut1',
  metacompetence: 'unites_temps',
  score: 1,
};

const N2Rut2 = {
  id: 'N2Rut2',
  nom_technique: 'N2Rut2',
  metacompetence: 'unites_temps',
  score: 1,
};

const N2Rrh1 = {
  id: 'N2Rrh1',
  nom_technique: 'N2Rrh1',
  metacompetence: 'renseigner_horaires',
  extensionVue: 'glisser-deposer-depot-multiple',
  reponsesNonClassees: [{illustration: personnage}],
  modalite_reponse: 'Vous devez mettre les horloges dans les bonnes cases, en fonction des horaires affichés. Pour confirmer votre réponse, cliquez sur le bouton "Valider" ,',
  zones_depot_url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4OCIgaGVpZ2h0PSI1NjYiIHZpZXdCb3g9IjAgMCAxMDg4IDU2NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgY2xhc3M9InpvbmUtZGVwb3QgYm9ubmUtcmVwb25zZSIgeD0iMjQwIiB5PSI3NCIgd2lkdGg9IjI1MSIgaGVpZ2h0PSIxNjEiIGZpbGw9IiMyMDAwOUYiIGZpbGwtb3BhY2l0eT0iMC4yNSIvPgo8cmVjdCBjbGFzcz0iem9uZS1kZXBvdCIgeD0iNjMiIHk9IjMyMCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMjMiIGZpbGw9IiNGRjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4zNCIvPgo8L3N2Zz4K",
  score: 1
};

const N2Rrh2 = {
  id: 'N2Rrh2',
  nom_technique: 'N2Rrh2',
  metacompetence: 'renseigner_horaires',
  extensionVue: 'glisser-deposer-depot-multiple',
  reponsesNonClassees: [{illustration: personnage}],
  zones_depot_url: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTA4OCIgaGVpZ2h0PSI1NjYiIHZpZXdCb3g9IjAgMCAxMDg4IDU2NiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3QgY2xhc3M9InpvbmUtZGVwb3QgYm9ubmUtcmVwb25zZSIgeD0iMjQwIiB5PSI3NCIgd2lkdGg9IjI1MSIgaGVpZ2h0PSIxNjEiIGZpbGw9IiMyMDAwOUYiIGZpbGwtb3BhY2l0eT0iMC4yNSIvPgo8cmVjdCBjbGFzcz0iem9uZS1kZXBvdCIgeD0iNjMiIHk9IjMyMCIgd2lkdGg9IjE1MCIgaGVpZ2h0PSIxMjMiIGZpbGw9IiNGRjAwMDAiIGZpbGwtb3BhY2l0eT0iMC4zNCIvPgo8L3N2Zz4K",
  score: 1
};

const N2Rtg1 = {
  id: 'N2Rtg1',
  nom_technique: 'N2Rtg1',
  metacompetence: 'tableaux_graphiques',
  score: 1,
};

const N2Rtg2 = {
  id: 'N2Rtg2',
  nom_technique: 'N2Rtg2',
  metacompetence: 'tableaux_graphiques',
  score: 1,
};

const N2Rpl1 = {
  id: 'N2Rpl1',
  nom_technique: 'N2Rpl1',
  metacompetence: 'plannings',
  score: 1,
};

const N2Rpl2 = {
  id: 'N2Rpl2',
  nom_technique: 'N2Rpl2',
  metacompetence: 'plannings',
  score: 1,
};

const N1Rrn = {
  series: [
    { cartes: [ N1RrnSousConsigne ]},
    { cartes: [ N1Rrn1, N1Rrn2 ] },
  ]
};

const N1Rde = {
  series: [
    { cartes: [ N1Rde1, N1Rde2 ] },
  ]
};

const N1Res = {
  series: [
    { cartes: [ N1Res1, N1Res2 ] },
  ]
};

const N1Ron = {
  series: [
    { cartes: [ N1Ron1, N1Ron2 ] },
  ]
};

const N1Roa = {
  series: [
    { cartes: [ N1Roa1, N1Roa2 ] },
  ]
};


const N1Ros = {
  series: [
    { cartes: [ N1Ros1, N1Ros2 ] },
  ]
};

const N2Rlp  = {
  series: [
    { cartes: [ N2Rlp1 , N2Rlp2 ] },
  ]
};

const N2Rpe = {
  series: [
    { cartes: [ N2Rpe1, N2Rpe2 ] },
  ]
};

const N2Rsu = {
  series: [
    { cartes: [ N2Rsu1, N2Rsu2 ] },
  ]
};

const N2Rom = {
  series: [
    { cartes: [ N2Rom1, N2Rom2 ] },
  ]
};

const N2Ron = {
  series: [
    { cartes: [ N2Ron1, N2Ron2 ] },
  ]
};

const N2Rod = {
  series: [
    { cartes: [ N2Rod1, N2Rod2 ] },
  ]
};

const N2Rut = {
  series: [
    { cartes: [ N2Rut1, N2Rut2 ] },
  ]
};

const N2Rrh = {
  series: [
    { cartes: [ N2Rrh1, N2Rrh2 ] },
  ]
};

const N2Rtg = {
  series: [
    { cartes: [ N2Rtg1, N2Rtg2 ] },
  ]
};

const N2Rpl = {
  series: [
    { cartes: [ N2Rpl1, N2Rpl2 ] },
  ]
};

export { N1Rrn, N1Rde, N1Res, N1Ron, N1Roa, N1Ros, N2Rlp, N2Rpe, N2Rsu, N2Rom, N2Ron, N2Rod, N2Rut, N2Rrh, N2Rtg, N2Rpl };
