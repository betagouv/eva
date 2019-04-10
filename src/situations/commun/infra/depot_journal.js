export class DepotJournal {
  constructor ($ = require('jquery')) {
    this.$ = $;
  }

  enregistre (payload) {
    return this.$.ajax({
      type: 'POST',
      url: `${process.env.URL_SERVEUR}/api/evenements`,
      data: JSON.stringify(payload),
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
}
