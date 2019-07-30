import $ from 'jquery';

import MockAudioNode from '../aides/mock_audio_node';

import VueConsigne from 'commun/vues/consigne';
import Situation, { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';

describe('vue consigne', function () {
  let vue;
  let situation;
  let consigne;
  let consigneCommune;

  beforeEach(function () {
    $('body').append('<div id="pointInsertion"></div>');
    situation = new Situation();
    consigne = new MockAudioNode();
    consigneCommune = new MockAudioNode();
    const depot = {
      consigne: () => consigne,
      consigneCommune: () => consigneCommune
    };
    vue = new VueConsigne(situation, depot);
  });

  it("change l'état a CONSIGNE_ECOUTEE une fois terminé", () => {
    vue.affiche('#pointInsertion', $);
    $(consigne).trigger('ended');
    $(consigneCommune).trigger('ended');
    expect(situation.etat()).to.eql(CONSIGNE_ECOUTEE);
  });
});
