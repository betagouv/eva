import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import MockDepotRessourcesControle from '../aides/mock_depot_ressources_controle';
import { DEMARRE, FINI } from 'commun/modeles/situation';
import Situation from 'controle/modeles/situation';
import VueFondSonore from 'controle/vues/fond_sonore';

describe('Le fond sonore', () => {
  let $;
  let situation;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    window.Audio = class {
      play () {}
      pause () {}
    };
    situation = new Situation({});
    vue = new VueFondSonore(situation, new MockDepotRessourcesControle());
  });

  it("ne joue rien a l'affichage", () => {
    let jouee = 0;
    vue.audio.start = e => jouee++;
    vue.affiche('#pointInsertion', $);
    expect(jouee).to.equal(0);
  });

  it("joue le fond sonore a l'état DEMARRE", () => {
    let jouee = 0;
    vue.audio.start = e => jouee++;
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);

    expect(jouee).to.equal(1);
  });

  it("stoppe le fond sonore lorsque c'est fini", () => {
    let stope = 0;
    vue.audio.stop = e => stope++;
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);
    situation.modifieEtat(FINI);
    expect(stope).to.equal(1);
  });
});
