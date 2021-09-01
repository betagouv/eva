import MockAudioNode from '../../commun/aides/mock_audio_node';
import { DEMARRE, FINI } from 'commun/modeles/situation';
import Situation from 'controle/modeles/situation';
import VueFondSonore from 'controle/vues/fond_sonore';

describe('Le fond sonore', function () {
  let situation;
  let vue;

  beforeEach(function () {
    document.body.innerHTML = '<div id="pointInsertion"></div>';
  });

  describe('joue le bruit du tapis', function () {
    beforeEach(function () {
      situation = new Situation({});
      const mockDepotRessource = new class {
        fondSonore () {
          return new MockAudioNode();
        }
      }();
      vue = new VueFondSonore(situation, mockDepotRessource);
    });

    afterEach(function () {
      vue.arrete();
    });

    it("ne joue rien à l'affichage", function () {
      let jouee = 0;
      vue.audio.start = e => jouee++;
      vue.affiche('#pointInsertion');
      expect(jouee).toBe(0);
    });

    it("joue à l'état DEMARRE", function () {
      let jouee = 0;
      vue.audio.start = e => jouee++;
      situation.modifieEtat(DEMARRE);
      vue.affiche('#pointInsertion');

      expect(jouee).toBe(1);
    });

    it("stoppe lorsque c'est fini", function () {
      let stope = 0;
      vue.audio.stop = e => stope++;
      vue.affiche('#pointInsertion');
      situation.modifieEtat(FINI);
      expect(stope).toBe(1);
    });
  });
});
