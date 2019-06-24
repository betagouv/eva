import { traduction } from 'commun/infra/internationalisation';
import EvenementReponseEnvoyee from 'compte_rendu/modeles/evenement_reponse_envoyee';
import 'commun/styles/boutons.scss';
import 'compte_rendu/styles/situation.scss';

export default class VueSituation {
  constructor (depotRessources, journal) {
    this.depotRessources = depotRessources;
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    const $vue = $(`
      <div class="situation">
        <div class="scene-compte-rendu">
          <img class="illustration" src=${this.depotRessources.accidentCarine().src}></img>
          <div class="messagerie">
            <p class="messagerie-sujet">${traduction('compte_rendu.objet_message_catherine')}</p>
            <p class="messagerie-expediteur">${traduction('compte_rendu.informations_expediteur')}</p>
            <p class='message-catherine-jean'>
              ${traduction('compte_rendu.message_catherine_jean')}
            </p>
            <p class="messagerie-objet-reponse">${traduction('compte_rendu.objet_reponse')}</p>
            <textarea id="reponse-compte-rendu" placeholder="${traduction('compte_rendu.entete_reponse')}"></textarea>
            <button id="envoi-reponse" class="bouton-reponse bouton-arrondi">
              ${traduction('compte_rendu.envoyer')}
            </button>
          </div
        </div>
      </div>
    `);

    $(pointInsertion).append($vue);
    $('#envoi-reponse').click(() => {
      const reponse = $('#reponse-compte-rendu').val().trim();
      const evenement = new EvenementReponseEnvoyee({ reponse });
      this.journal.enregistre(evenement);
    });
  }
}
