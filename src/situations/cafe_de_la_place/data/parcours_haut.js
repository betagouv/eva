import journalVide from '../assets/journal_vide.png';
import journalAvecNouvelle from '../assets/journal_avec_nouvelle.png';
import journalAvecNouvelleZoom from '../assets/journal_avec_nouvelle_zoom.png';
import hParConsigne from '../assets/hpar_c1.png';

const sousConsigneHPar1 = {
  id: 'HPar-sous-consigne-1',
  nom_technique: 'sous_consigne_HPar_1',
  type: 'sous-consigne',
  illustration: hParConsigne,
  intitule: "Après le programme télé, vous lisez les « Nouvelles du jour ».<br><br>Un accident de la route a eu lieu dans votre ville ! Mais le texte est un peu bizarre, les phrases sont mélangées.",
  modalite_reponse: "Déplacez les blocs de texte sur la page du journal à gauche en remettant l'article dans l'ordre.<br>Vous pouvez modifier l'ordre autant de fois que vous le souhaitez. Une fois que l’ordre des phrases vous convient, cliquez sur « Valider ».<br><br>Pour commencer, cliquez sur « Suivant »."
};

const fragmentsNouvelleDuJour = [
  {
    id: 6,
    contenu: "Durant leur séjour à l'hôpital, ils auront tout loisir de se raconter leurs petites histoires..."
  }, {
    id: 1,
    contenu: "En effet, il est 8 h 45 quand le jeune David G. s'apprête à traverser la chaussée."
  }, {
    id: 2,
    contenu: "Un de ses copains de classe, Rémi P. qui était déjà devant l'école, se met lui aussi à traverser la chaussée pour aller à sa rencontre."
  }, {
    id: 5,
    contenu: "Les deux amis, blessés au visage pour l'un et à la jambe pour l'autre, ont été transportés à l'hôpital tout proche."
  }, {
    id: 3,
    contenu: "Les deux garçons se dirigent l'un vers l'autre sans regarder la circulation."
  }, {
    id: 0,
    contenu: "Ce matin, alors que les enfants arrivaient à proximité de l'école, deux garçons particulièrement distraits ont provoqué un accident sur la voie publique près de l'école Jules Ferry."
  }, {
    id: 4,
    contenu: "Deux voitures qui arrivaient en sens contraire, ont chacune projeté violemment un garçon à terre provoquant la frayeur des témoins."
  }
];

const HPar1 = {
  id: 'HPar1',
  nom_technique: 'hpar_1',
  illustration: journalVide,
  extensionVue: 'puzzle',
  description: "Vous avez placé tous les blocs de texte !<br>Vous pouvez toujours modifier leur ordre directement dans la page du journal.",
  intitule: "Si l’ordre vous convient, cliquez sur « Valider ».",
  fragmentsNonClasses: fragmentsNouvelleDuJour
};

const HPar2 = {
  id: 'HPar2',
  nom_technique: 'hpar_2',
  type: 'qcm',
  illustration: journalAvecNouvelle,
  intitule: "C'est plus clair comme ça ! Mais quel pourrait être le titre de cet article ?",
  modalite_reponse: "Choisissez le titre qui résume le mieux le texte. Pour confirmer votre réponse, cliquez sur « Valider »",
  choix: [
    {
      id: 'deux_blesses_ecole',
      nom_technique: 'deux_blesses_ecole',
      score: 1,
      bonneReponse: true,
      intitule: "Deux enfants blessés sur la route de l'école"
    },
    {
      id: 'trois_blesses',
      nom_technique: 'trois_blesses',
      bonneReponse: false,
      intitule: 'Trois blessés à Jules Ferry'
    },
    {
      id: 'deux_morts',
      nom_technique: 'deux_morts',
      bonneReponse: false,
      intitule: 'Deux morts dans une collision frontale'
    },
    {
      id: 'deux_blesses_hopital',
      nom_technique: 'deux_blesses_hopital',
      bonneReponse: false,
      intitule: "Deux enfants blessés devant l'hôpital Jules Ferry"
    }
  ]
};

const HPar3 = {
  id: 'HPar3',
  nom_technique: 'hpar_3',
  illustration: journalAvecNouvelleZoom,
  type: 'qcm',
  intitule: "L'article utilise le mot « frayeur ». Si on voulait le remplacer par un autre mot qui a un sens proche, lequel pourrait-on choisir ?",
  choix: [
    {
      id: 'surprise',
      nom_technique: 'surprise',
      bonneReponse: false,
      intitule: 'Surprise'
    },
    {
      id: 'peur',
      nom_technique: 'peur',
      score: 1,
      bonneReponse: true,
      intitule: 'Peur'
    },
    {
      id: 'inquietude',
      nom_technique: 'inquietude',
      bonneReponse: false,
      intitule: 'Inquiétude'
    },
    {
      id: 'agitation',
      nom_technique: 'agitation',
      bonneReponse: false,
      intitule: 'Agitation'
    }
  ]
};

const parcoursHaut = {
  series: [
    { cartes: [ sousConsigneHPar1 ] },
    {
      cartes: [ HPar1, HPar2, HPar3 ]
    }
  ]
};

export { parcoursHaut };
