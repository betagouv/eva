import 'accueil/styles/formulaire_identification.scss';
import 'commun/styles/boutons.scss';
import { traduction } from 'commun/infra/internationalisation';
import { CHANGEMENT_CONNEXION } from 'commun/infra/registre_utilisateur';

export default class FormulaireIdentification {
  constructor (registreUtilisateur) {
    this.registreUtilisateur = registreUtilisateur;
  }

  affiche (pointInsertion, $) {
    this.registreUtilisateur.on(CHANGEMENT_CONNEXION, () => this.rafraichis());

    function creeGabarit (registre) {
      const $resultat = $(`
        <form class="formulaire-identification" id="formulaire-identification">
          <h2>${traduction('accueil.identification.titre')}</h2>
          <label for="formulaire-identification-input">
            ${traduction('accueil.identification.label')}
          </label>
          <div class="flex">
            <input id="formulaire-identification-input" type="text" class="input-accueil" autofocus>
            <button class="bouton-arrondi">${traduction('accueil.identification.boutton')}</button>
          </div>
        </form>
      `);

      return $resultat;
    }

    this.$gabarit = creeGabarit(this.registreUtilisateur);
    this.rafraichis();

    this.$gabarit.on('submit', (e) => {
      e.preventDefault();
      const $input = $('input[type=text]', this.$gabarit);
      const identifiantUtilisateur = $input.val().trim();
      if (identifiantUtilisateur !== '') {
        this.registreUtilisateur.inscris(identifiantUtilisateur);
        $input.val('');
      }
    });

    $(pointInsertion).append(this.$gabarit);
  }

  rafraichis () {
    this.$gabarit.toggleClass('invisible', this.registreUtilisateur.estConnecte());
  }
}
