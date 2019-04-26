import jsdom from 'jsdom-global';

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
    vue = new VueFondSonore(situation);
  });

  it("ne joue rien a l'affichage", () => {
    let play = 0;
    vue.audio.play = e => play++;
    vue.affiche('#pointInsertion', $);
    expect(play).to.equal(0);
  });

  it("joue le fond sonore a l'état DEMARRE", () => {
    let play = 0;
    vue.audio.play = e => play++;
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);

    expect(play).to.equal(1);
  });

  it("stoppe le fond sonore lorsque c'est fini", () => {
    let pause = 0;
    vue.audio.pause = e => pause++;
    situation.modifieEtat(DEMARRE);
    vue.affiche('#pointInsertion', $);
    situation.modifieEtat(FINI);
    expect(pause).to.equal(1);
  });
});
