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
        <img class="question-illustration" src=${this.srcResource}></img>
        <div class="question-barre">
          <p class="couleur-grise sans-marge">${this.question.description}</p>
          <p class="sans-marge">${this.question.intitule}</p>
          ${$valeursPossibles}
          <button id="envoi-reponse" class="question-bouton bouton-arrondi">
            ${traduction('questions.qcm.valider')}
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
