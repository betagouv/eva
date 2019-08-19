import 'commun/styles/boutons.scss';
import 'questions/styles/situation.scss';

import { traduction } from 'commun/infra/internationalisation';

import VueQuestion, { EVENEMENT_REPONSE } from './question';

export { EVENEMENT_REPONSE };

export default class VueQCM extends VueQuestion {
  affiche (pointInsertion, $) {
    const choix = this.question.choix;
    const $valeursPossibles = choix.map((choix) => {
      return `
        <div class="question-choix">
          <label>
            <input name="numeratie" type="radio" value="${choix.id}" />
            ${choix.intitule}
          </label>
        </div>
      `;
    }).join('');
    this.$vue = $(`
      <div id="numeratie" class="question">
        <img class="question-illustration" src=${this.question.illustration}></img>
        <div class="question-barre">
          <p class="sans-marge">${this.question.description}</p>
          <p class="intitule-question sans-marge">${this.question.intitule}</p>
          ${$valeursPossibles}
          <button id="envoi-reponse" class="question-bouton bouton-arrondi" disabled>
            ${traduction('questions.qcm.valider')}
          </button>
        </div
      </div>
    `);
    $(pointInsertion).append(this.$vue);
    const $envoiReponse = $('#envoi-reponse', this.$vue);
    $('input[name="numeratie"]', this.$vue).on('input', () => {
      $envoiReponse.prop('disabled', false);
    });
    $envoiReponse.click(() => {
      $envoiReponse.prop('disabled', true);
      const reponse = $('input[name="numeratie"]:checked', this.$vue).val();
      this.emit(EVENEMENT_REPONSE, reponse);
    });
  }
}
