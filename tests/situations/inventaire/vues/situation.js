import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import { unMagasinVide } from '../aides/magasin';
import VueSituation from 'inventaire/vues/situation';
import MockDepotRessourcesInventaire from '../aides/mock_depot_ressources';

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
    situation = unMagasinVide();
    depotRessources = new MockDepotRessourcesInventaire();
    vue = new VueSituation(situation, mockJournal, depotRessources);
  });

  it('affiche les étagères', function () {
    expect($('#point-insertion .etageres').length).to.equal(0);

    vue.affiche('#point-insertion', $);

    expect($('#point-insertion .etageres').length).to.equal(1);
  });
});
