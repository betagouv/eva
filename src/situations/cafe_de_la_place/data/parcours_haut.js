import journalVide from '../assets/journal_vide.png';

const sousConsigneHPar1 = {
  id: 'HPar-sous-consigne-1',
  nom_technique: 'sous_consigne_HPar_1',
  type: 'sous-consigne',
  intitule: "Première sous-consigne du parcours Haut à venir",
};

const HPar1 = {
  id: 'HPar1',
  nom_technique: 'HPar_1',
  illustration: journalVide,
  extensionVue: 'puzzle',
  description: "Vous avez placé tous les blocs de texte !<br>Vous pouvez toujours modifier leur ordre directement dans la page du journal.",
  intitule: "Si l’ordre vous convient, cliquez sur « Valider ».",
};

const parcoursHaut = {
  series: [
    { cartes: [ sousConsigneHPar1, HPar1 ] },
  ]
};

export { parcoursHaut };
