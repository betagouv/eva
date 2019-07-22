import 'commun/styles/boutons.scss';
import 'questions/styles/situation.scss';
import 'questions/styles/redaction_note.scss';

import { traduction } from 'commun/infra/internationalisation';

import VueQuestion, { EVENEMENT_REPONSE } from './question';

export { EVENEMENT_REPONSE };

export default class VueRedactionNote extends VueQuestion {
  affiche (pointInsertion, $) {
    this.$vue = $(`
      <div class="question">
        <img class="question-illustration" src=${this.question.illustration}></img>
        <div class="messagerie question-barre">
          <p class="messagerie-sujet">${this.question.intitule}</p>
          <p class="messagerie-expediteur couleur-grise">${this.question.expediteur}</p>
          <p class='message-catherine-jean'>
            ${this.question.message}
          </p>
          <p class="messagerie-objet-reponse">${this.question.objet_reponse}</p>
          <textarea id="reponse-compte-rendu" placeholder="${this.question.entete_reponse}"></textarea>
          <button id="envoi-reponse" class="question-bouton bouton-arrondi">
            ${traduction('questions.redaction_note.envoyer')}
          </button>
        </div>
      </div>
    `);

    $(pointInsertion).append(this.$vue);
    $('#envoi-reponse', this.$vue).click(() => {
      const reponse = $('#reponse-compte-rendu').val().trim();
      this.emit(EVENEMENT_REPONSE, reponse);
    });
  }
}
