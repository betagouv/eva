import 'accueil/styles/accueil.scss';
import FormulaireIdentification from './formulaire_identification';

export default class VueAccueil {
  constructor (situations, registreUtilisateur, depotRessources) {
    this.situations = situations;
    this.registreUtilisateur = registreUtilisateur;
    this.depotRessources = depotRessources;
  }

  affiche (pointInsertion, $) {
    const creeElementSituation = (situation) => {
      const $situation = $(`
        <a href="${situation.chemin}" class='situation ${situation.identifiant}'>
          ${situation.nom}
        </a>
      `);
      $situation.css('background-image', `url('${this.depotRessources.batimentSituation(situation.identifiant).src}')`);
      return $situation;
    };

    const creeElementListe = (situations) => {
      const $liste = $(`<div class='situations'></div>`);
      $liste.css('background-image', `url('${this.depotRessources.fondAccueil().src}')`);
      const $elementsSituation = situations.map((s) => { return creeElementSituation(s); });
      $liste.append(...$elementsSituation);
      return $liste;
    };

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
