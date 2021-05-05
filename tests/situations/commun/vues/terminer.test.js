import $ from 'jquery';
import VueTerminer from 'commun/vues/terminer.js';

describe('Affiche les éléments liés à la fin de la situation', function () {
  let vue;
  let situation;

  beforeEach(function () {
    $('body').append('<div id="pointInsertion"></div>');
    situation = {
      identifiant: 'maSituation',
      resultat: { }
    };
    vue = new VueTerminer(situation);
  });

  it('affiche une fenêtre modale de fin', function () {
    vue.affiche('#pointInsertion', $);
    expect($('#fenetre-modale').length).toBe(1);
  });

  it('affiche le message de succés', function () {
    vue.affiche('#pointInsertion', $);
    expect($('#fenetre-modale').find('h2').text()).toBe('situation.reussite');
  });

  it("affiche le bouton retour à l'accueil", function () {
    vue.affiche('#pointInsertion', $);
    expect($('#fenetre-modale').find('button').text()).toBe('situation.retour_accueil');
  });

  it('affiche les résultats', function () {
    situation.resultat = {
      resultat1: 'valeurResultat1',
      resultat2: 'valeurResultat2'
    };
    vue.affiche('#pointInsertion', $);
    const $fenetre = $('#fenetre-modale');
    expect($fenetre.find('.message-fin').length).toBe(1);
    expect($fenetre.find('.message-fin p').length).toBe(2);
    expect($fenetre.find('.message-fin p').first().text())
      .toEqual('maSituation.resultat.resultat1{"nombre":"valeurResultat1"}');
  });
});
