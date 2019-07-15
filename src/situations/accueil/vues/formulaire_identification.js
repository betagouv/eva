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
          <label for="formulaire-identification-input-nom">
            ${traduction('accueil.identification.label')}
          </label>
          <div class="element-formulaire">
            <input id="formulaire-identification-input-nom" type="text" class="input-accueil" autofocus>
          </div>
          <label for="formulaire-identification-input-campagne">
            ${traduction('accueil.identification.campagne')}
          </label>
          <div class="element-formulaire">
            <input id="formulaire-identification-input-campagne" type="text" class="input-accueil">
          </div>
          <div class="element-formulaire">
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
      const $inputNom = $('#formulaire-identification-input-nom', this.$gabarit);
      const identifiantUtilisateur = $inputNom.val().trim();
      const $inputCodeCampagne = $('#formulaire-identification-input-campagne', this.$gabarit);
      const codeCampagne = $inputCodeCampagne.val().trim();
      if (identifiantUtilisateur !== '') {
        this.registreUtilisateur.inscris(identifiantUtilisateur, codeCampagne);
        $inputNom.val('');
        $inputCodeCampagne.val('');
      }
    });

    $(pointInsertion).append(this.$gabarit);
  }

  rafraichis () {
    this.$gabarit.toggleClass('invisible', this.registreUtilisateur.estConnecte());
  }
}
