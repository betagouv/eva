import jsdom from 'jsdom-global';
import { unMagasinVide } from '../aides/magasin';
import VueSituation from 'inventaire/vues/situation';
import { CHANGEMENT_ETAT, DEMARRE } from 'commun/modeles/situation';
import EvenementDemarrage from 'commun/modeles/evenement_demarrage';

describe('La situation « Inventaire »', function () {
  let $;
  let mockJournal;
  let situation;
  let vue;
  let depotRessources;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    mockJournal = {
      enregistre: () => {}
    };
    depotRessources = { image () { return new window.Image(); } };
    situation = unMagasinVide();
    vue = new VueSituation(situation, mockJournal, depotRessources);
  });

  it('affiche les étagères', function () {
    expect($('#point-insertion .etageres').length).to.equal(0);

    vue.affiche('#point-insertion', $);

    expect($('#point-insertion .etageres').length).to.equal(1);
  });

  it("incrit le journal à l'événement démarrage", function (done) {
    mockJournal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementDemarrage);
      done();
    };

    situation.emit(CHANGEMENT_ETAT, DEMARRE);
  });
});
