import 'commun/styles/boutons.scss';
import 'compte_rendu/styles/situation.scss';

import { traduction } from 'commun/infra/internationalisation';

import VueQuestion, { EVENEMENT_REPONSE } from './question';

export { EVENEMENT_REPONSE };

export default class VueNumeratie extends VueQuestion {
  affiche (pointInsertion, $) {
    const valeurs = [144, 288, 32, 384, 624];
    const $valeursPossibles = valeurs.map((valeur) => {
      return `
        <div>
          <label>
            <input name="numeratie" type="radio" value="${valeur}" />
            ${valeur}
          </label>
        </div>
      `;
    }).join('');
    this.$vue = $(`
      <div id="numeratie">
        <img class="illustration" src=${this.depotRessources.palette().src}></img>
        <div class="question">
          <p>${traduction('qcm.numeratie.description')}</p>
          <p>${traduction('qcm.numeratie.question')}</p>
          ${$valeursPossibles}
          <button id="envoi-reponse" class="bouton-reponse bouton-arrondi">
            ${traduction('qcm.numeratie.valider')}
          </button>
        </div
      </div>
    `);

    $(pointInsertion).append(this.$vue);
    $('#envoi-reponse', this.$vue).click(() => {
      const reponse = $('input[name="numeratie"]:checked').val();
      this.emit(EVENEMENT_REPONSE, reponse);
    });
  }
}
