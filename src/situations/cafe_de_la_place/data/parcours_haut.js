import journalVide from '../assets/journal_vide.png';
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
  nom_technique: 'HPar_1',
  illustration: journalVide,
  extensionVue: 'puzzle',
  description: "Vous avez placé tous les blocs de texte !<br>Vous pouvez toujours modifier leur ordre directement dans la page du journal.",
  intitule: "Si l’ordre vous convient, cliquez sur « Valider ».",
  fragmentsNonClasses: fragmentsNouvelleDuJour
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
