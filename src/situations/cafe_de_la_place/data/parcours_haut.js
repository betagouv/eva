import journalVide from '../assets/journal_vide.png';

const sousConsigneHPar1 = {
  id: 'HPar-sous-consigne-1',
  nom_technique: 'sous_consigne_HPar_1',
  type: 'sous-consigne',
  intitule: "Première sous-consigne du parcours Haut à venir",
};

const fragmentsNouvelleDuJour = [
  {
    id: 'fragment_1',
    contenu: "Durant leur séjour à l'hôpital, ils auront tout loisir de se raconter leurs petites histoires..."
  }, {
    id: 'fragment_2',
    contenu: "En effet, il est 8 h 45 quand le jeune David G. s'apprête à traverser la chaussée."
  }, {
    id: 'fragment_3',
    contenu: "Un de ses copains de classe, Rémi P. qui était déjà devant l'école, se met lui aussi à traverser la chaussée pour aller à sa rencontre."
  }, {
    id: 'fragment_4',
    contenu: "Les deux amis, blessés au visage pour l'un et à la jambe pour l'autre, ont été transportés à l'hôpital tout proche."
  }, {
    id: 'fragment_5',
    contenu: "Les deux garçons se dirigent l'un vers l'autre sans regarder la circulation."
  }, {
    id: 'fragment_6',
    contenu: "Ce matin, alors que les enfants arrivaient à proximité de l'école, deux garçons particulièrement distraits ont provoqué un accident sur la voie publique près de l'école Jules Ferry."
  }, {
    id: 'fragment_7',
    contenu: "Deux voitures qui arrivaient en sens contraire, ont chacune projeté violemment un garçon à terre provoquant la frayeur des témoins."
  }
];

const HPar1 = {
  id: 'HPar1',
  nom_technique: 'HPar_1',
  illustration: journalVide,
  extensionVue: 'puzzle',
  description: "Vous avez placé tous les blocs de texte !<br>Vous pouvez toujours modifier leur ordre directement dans la page du journal.",
  intitule: "Si l’ordre vous convient, cliquez sur « Valider ».",
  fragmentsNonClasses: fragmentsNouvelleDuJour,
  reponse: {
    bonOrdre: [
      'fragment_6',
      'fragment_2',
      'fragment_3',
      'fragment_5',
      'fragment_7',
      'fragment_4',
      'fragment_1'
    ]
  }
};

const parcoursHaut = {
  series: [
    { cartes: [ sousConsigneHPar1 ] },
    {
      cartes: [ HPar1 ]
    }
  ]
};

export { parcoursHaut };
