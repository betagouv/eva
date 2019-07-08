import 'commun/styles/boutons.scss';
import 'compte_rendu/styles/situation.scss';

import { traduction } from 'commun/infra/internationalisation';

import VueQuestion, { EVENEMENT_REPONSE } from './question';

export { EVENEMENT_REPONSE };

export default class VueLitteratie extends VueQuestion {
  affiche (pointInsertion, $) {
    const dateCourante = new Date().toLocaleDateString();
    const heureSansSecondes = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const $vue = $(`
      <img class="illustration" src=${this.depotRessources.accidentCarine().src}></img>
      <div class="messagerie">
        <p class="messagerie-sujet">${traduction('compte_rendu.objet_message_catherine')}</p>
        <p class="messagerie-expediteur">${traduction('compte_rendu.informations_expediteur', { date_courante: dateCourante, heure_sans_secondes: heureSansSecondes })}</p>
        <p class='message-catherine-jean'>
          ${traduction('compte_rendu.message_catherine_jean')}
        </p>
        <p class="messagerie-objet-reponse">${traduction('compte_rendu.objet_reponse')}</p>
        <textarea id="reponse-compte-rendu" placeholder="${traduction('compte_rendu.entete_reponse')}"></textarea>
        <button id="envoi-reponse" class="bouton-reponse bouton-arrondi">
          ${traduction('compte_rendu.envoyer')}
        </button>
      </div>
    `);

    $(pointInsertion).append($vue);
    $('#envoi-reponse', $vue).click(() => {
      const reponse = $('#reponse-compte-rendu').val().trim();
      this.emit(EVENEMENT_REPONSE, reponse);
    });
  }
}
