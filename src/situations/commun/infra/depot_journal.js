import jQuery from 'jquery';

export default class DepotJournal {
  constructor ($ = jQuery) {
    this.$ = $;
    this.enregistrements = [];
  }

  attendFinEnregistrement () {
    return Promise.all(this.enregistrements);
  }

  enregistre (payload, timeout = 60000) {
    let delay = 100;
    const promesseDEnregistrement = new Promise((resolve, reject) => {
      this.$.ajax({
        type: 'POST',
        url: `${process.env.URL_API}/api/evenements`,
        data: JSON.stringify(payload),
        contentType: 'application/json; charset=utf-8',
        retryTimeout: timeout,
        appel: this.$,
        datePremierAppel: Date.now(),
        success: resolve,
        error: function (xhr) {
          if (Date.now() - this.datePremierAppel < this.retryTimeout) {
            setTimeout(() => {
              delay = Math.min(delay * 2, 2000);
              this.appel.ajax(this);
            }, delay);
          } else {
            reject(xhr);
          }
        }
      });
    });
    this.enregistrements.push(promesseDEnregistrement);
    return promesseDEnregistrement;
  }
}
