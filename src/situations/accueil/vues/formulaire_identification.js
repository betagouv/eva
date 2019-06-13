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
            <input type="text" value="${identifiantActuel}" autofocus>
          </label>
          <button class="bouton-demarrer">${traduction('accueil.identification.boutton')}</button>
        </form>
      `);

      return $resultat;
    }

    this.$gabarit = creeGabarit(this.registreUtilisateur);
    this.$gabarit.on('submit', (e) => {
      e.preventDefault();
      const identifiantUtilisateur = $('input[type=text]', this.$gabarit).val().trim();
      if (identifiantUtilisateur !== '') {
        this.registreUtilisateur.inscris(identifiantUtilisateur);
      }
    });
    $(pointInsertion).append(this.$gabarit);
  }

  supprime () {
    if (this.$gabarit) {
      this.$gabarit.fadeOut(() => {
        this.$gabarit.remove();
      });
    }
  }
}
