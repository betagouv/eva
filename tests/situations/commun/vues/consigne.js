import jsdom from 'jsdom-global';

import MockAudioNode from '../aides/mock_audio_node';

import VueConsigne from 'commun/vues/consigne';
import Situation, { CONSIGNE_ECOUTEE } from 'commun/modeles/situation';

describe('vue consigne', function () {
  let vue;
  let $;
  let situation;

  beforeEach(function () {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation();
    const depot = {
      consigne: () => new MockAudioNode(),
      consigneCommune: () => new MockAudioNode()
    };
    vue = new VueConsigne(situation, depot);
  });

  it("change l'état a CONSIGNE_ECOUTEE une fois terminé", () => {
    vue.affiche('#pointInsertion', $);
    $(vue.consigne).trigger('ended');
    $(vue.consigneCommune).trigger('ended');
    expect(situation.etat()).to.eql(CONSIGNE_ECOUTEE);
  });
});
