import 'accueil/styles/formulaire_identification.scss';
import { traduction } from 'commun/infra/internationalisation';

export default class FormulaireIdentification {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  affiche (pointInsertion, $) {
    function creeGabarit (registre) {
      const identifiantActuel = registre.consulte() || '';
      const $resultat = $(`
        <form class="formulaire-identification" id="formulaire-identification">
          <h2>${traduction('accueil.identification.titre')}</h2>
          <label>
            <span>${traduction('accueil.identification.label')}</span>
            <br />
            <input type="text" value="${identifiantActuel}">
          </label>
          <button class="bouton-demarrer">${traduction('accueil.identification.boutton')}</button>
        </form>
      `);

      return $resultat;
    }

    const $gabarit = creeGabarit(this.registreUtilisateur);
    $gabarit.on('submit', (e) => {
      e.preventDefault();
      const identifiantUtilisateur = $('input[type=text]', $gabarit).val();
      this.registreUtilisateur.inscris(identifiantUtilisateur);
    });
    $(pointInsertion).append($gabarit);
  }
}
