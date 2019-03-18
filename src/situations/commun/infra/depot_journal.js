import { config } from '../../../../config.json';

export class DepotJournal {
  constructor ($ = require('jquery')) {
    this.lignes = JSON.parse(window.localStorage.getItem('journal'));
    if (!this.lignes) {
      this.lignes = [];
      window.localStorage.setItem('journal', JSON.stringify(this.lignes));
    }
    this.$ = $;
  }

  enregistre (ligne) {
    this.lignes.push(ligne);
    window.localStorage.setItem('journal', JSON.stringify(this.lignes));
    this.envoiEvenementAuServeur(ligne);
  }

  evenements () {
    return this.lignes;
  }

  envoiEvenementAuServeur (ligne) {
    this.$.ajax({
      type: 'POST',
      url: config.hote_serveur + '/api/evenements',
      data: JSON.stringify(this.recuperePayload(ligne)),
      contentType: 'application/json; charset=utf-8',
      retryTimeout: 60000,
      appel: this.$,
      datePremierAppel: Date.now(),
      error: function (xhr) {
        if (Date.now() - this.datePremierAppel < this.retryTimeout) {
          setTimeout(() => {
            this.appel.ajax(this);
          }, 5000);
        }
      }
    });
  }

  recuperePayload (ligne) {
    const { date, nom, donnees, sessionId } = ligne;
    return { date, donnees, nom, session_id: sessionId, situation: 'inventaire' };
  }
}
