import MockAudioNode from '../../commun/aides/mock_audio_node';
import { DEMARRE, FINI } from 'commun/modeles/situation';
import Situation from 'controle/modeles/situation';
import VueFondSonore from 'controle/vues/fond_sonore';

describe('Le fond sonore', function () {
  let situation;
  let vue;

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
      vue.audio.start = () => jouee++;
      vue.affiche();
      expect(jouee).toBe(0);
    });

    it("joue à l'état DEMARRE", function () {
      let jouee = 0;
      vue.audio.start = () => jouee++;
      situation.modifieEtat(DEMARRE);
      vue.affiche();

      expect(jouee).toBe(1);
    });

    it("stoppe lorsque c'est fini", function () {
      let stope = 0;
      vue.audio.stop = () => stope++;
      vue.affiche();
      situation.modifieEtat(FINI);
      expect(stope).toBe(1);
    });
  });
});
