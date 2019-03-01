
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
      url: 'http://localhost:3000/api/evenements',
      data: JSON.stringify(this.recupereDonnees(ligne)),
      contentType: 'application/json; charset=utf-8',
      success: function (data, status, jqXHR) {
        console.log('Succès');
      },
      error: function (jqXHR, status) {
        console.log('Echec ' + status.code);
      }
    });
  }

  recupereDonnees (ligne) {
    var [date, type, description] = [ligne['date'], ligne['type'], ligne['description'].toString()];
    var data = { date: date,
      type_evenement: type,
      description: description,
      session_id: 'fake session_id',
      situation: 'inventaire' };
    return data;
  }
}
