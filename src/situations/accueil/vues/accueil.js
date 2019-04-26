import FormulaireIdentification from './formulaire_identification';

export default class VueAccueil {
  constructor (situations, registreUtilisateur) {
    this.situations = situations;
    this.registreUtilisateur = registreUtilisateur;
  }

  affiche (pointInsertion, $) {
    function creeElementSituation (situation) {
      return $(`
        <li>
          <a href="${situation.chemin}" class='bouton'>
            ${situation.nom}
            <i class="fas fa-caret-right"></i>
          </a>
        </li>
      `);
    }

    function creeElementListe (situations) {
      const $liste = $(`<ul></ul>`);
      const $elementsSituation = situations.map(s => { return creeElementSituation(s); });
      $liste.append(...$elementsSituation);
      return $liste;
    }
    const formulaireIdentification = new FormulaireIdentification(this.registreUtilisateur);
    const $situations = creeElementListe(this.situations);
    $(pointInsertion).append('<h1>Compétences pro</h1>');
    formulaireIdentification.affiche(pointInsertion, $);
    $(pointInsertion).append($situations);
  }
}
