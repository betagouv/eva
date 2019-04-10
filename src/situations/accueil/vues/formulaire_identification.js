import { traduction } from 'commun/infra/internationalisation';

export default class FormulaireIdentification {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  affiche (pointInsertion, $) {
    function creeGabarit (registre) {
      const identifiantActuel = registre.consulte() || '';
      const $resultat = $(`
        <form id="formulaire-identification">
          <label>
            ${traduction('accueil.identification.label')}
            <input type="text" value="${identifiantActuel}">
          </label>
          <button>${traduction('accueil.identification.button')}</button>
        </form>
      `);

      return $resultat;
    }

    const $gabarit = creeGabarit(this.registreUtilisateur);
    $('button', $gabarit).on('click', (e) => {
      e.preventDefault();
      const identifiantUtilisateur = $('input[type=text]', $gabarit).val();
      this.registreUtilisateur.inscris(identifiantUtilisateur);
    });
    $(pointInsertion).append($gabarit);
  }
}
