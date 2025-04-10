import $ from 'jquery';

import { unMagasinVide } from '../aides/magasin';
import VueSituation from 'inventaire/vues/situation';
import MockDepotRessourcesInventaire from '../aides/mock_depot_ressources';
import { creeStore } from 'commun/modeles/store';
jest.mock('commun/modeles/store');

describe('La situation « Inventaire »', function () {
  let mockJournal;
  let situation;
  let vue;
  let depotRessources;

  beforeEach(function () {
    $('body').append('<div id="pointInsertion"></div>');
    mockJournal = {
      enregistre: () => {}
    };
    situation = unMagasinVide();
    depotRessources = new MockDepotRessourcesInventaire();
    vue = new VueSituation(situation, mockJournal, depotRessources);
  });

  it("crée un store à l'initialisation", function () {
    expect(creeStore).toHaveBeenCalledTimes(1);
  });

  it('affiche les étagères', function () {
    expect($('#pointInsertion .etageres').length).toBe(0);

    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .etageres').length).toBe(1);
  });
});
