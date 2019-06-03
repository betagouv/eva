import 'accueil/styles/accueil.scss';

import FormulaireIdentification from './formulaire_identification';

export default class VueAccueil {
  constructor (situations, registreUtilisateur) {
    this.situations = situations;
    this.registreUtilisateur = registreUtilisateur;
  }

  affiche (pointInsertion, $) {
    function creeElementSituation (situation) {
      return $(`
        <a href="${situation.chemin}" class='situation ${situation.identifiant}'>
          ${situation.nom}
        </a>
      `);
    }

    function creeElementListe (situations) {
      const $liste = $(`<div class='situations'></div>`);
      const $elementsSituation = situations.map(s => { return creeElementSituation(s); });
      $liste.append(...$elementsSituation);
      return $liste;
    }

    function creeTitre (registreUtilisateur) {
      const $titre = $("<div class='titre'></div>");
      $($titre).append('<h1>Compétences pro</h1>');
      const formulaireIdentification = new FormulaireIdentification(registreUtilisateur);
      formulaireIdentification.affiche($titre, $);
      return $titre;
    }

    const $situations = creeElementListe(this.situations);
    const $titre = creeTitre(this.registreUtilisateur);
    $(pointInsertion).append($titre, $situations);
  }
}
