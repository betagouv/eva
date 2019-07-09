import 'commun/styles/boutons.scss';
import 'questions/styles/situation.scss';
import 'questions/styles/litteratie.scss';

import { traduction } from 'commun/infra/internationalisation';

import VueQuestion, { EVENEMENT_REPONSE } from './question';

export { EVENEMENT_REPONSE };

export default class VueLitteratie extends VueQuestion {
  affiche (pointInsertion, $) {
    const dateCourante = new Date().toLocaleDateString();
    const heureSansSecondes = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    this.$vue = $(`
      <div id="litteratie" class="question">
        <img class="question-illustration" src=${this.depotRessources.accidentCarine().src}></img>
        <div class="messagerie question-barre">
          <p class="messagerie-sujet">${traduction('questions.litteratie.objet_message_catherine')}</p>
          <p class="messagerie-expediteur couleur-grise">${traduction('questions.litteratie.informations_expediteur', { date_courante: dateCourante, heure_sans_secondes: heureSansSecondes })}</p>
          <p class='message-catherine-jean'>
            ${traduction('questions.litteratie.message_catherine_jean')}
          </p>
          <p class="messagerie-objet-reponse">${traduction('questions.litteratie.objet_reponse')}</p>
          <textarea id="reponse-compte-rendu" placeholder="${traduction('questions.litteratie.entete_reponse')}"></textarea>
          <button id="envoi-reponse" class="question-bouton bouton-arrondi">
            ${traduction('questions.litteratie.envoyer')}
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
