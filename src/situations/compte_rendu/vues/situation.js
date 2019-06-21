import { traduction } from 'commun/infra/internationalisation';
import EvenementReponseEnvoyee from 'compte_rendu/modeles/evenement_reponse_envoyee';

export default class VueSituation {
  constructor (depotRessources, journal) {
    this.depotRessources = depotRessources;
    this.journal = journal;
  }

  affiche (pointInsertion, $) {
    const $vue = $(`
      <div class="situation">
        <img class="illustration" src=${this.depotRessources.accidentCarine().src}></img>
        <textarea id="reponse-compte-rendu" rows="5" cols="33">
          ${traduction('compte_rendu.entete_reponse')}
        </textarea>
        <button id="envoi-reponse">
          ${traduction('compte_rendu.envoyer')}
        </button>
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
