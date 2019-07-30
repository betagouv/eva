import MockAudioNode from '../../commun/aides/mock_audio_node';
import { DEMARRE, FINI } from 'commun/modeles/situation';
import Situation from 'controle/modeles/situation';
import VueFondSonore from 'controle/vues/fond_sonore';

describe('Le fond sonore', () => {
  let situation;
  let vue;

  beforeEach(() => {
    document.body.innerHTML = '<div id="pointInsertion"></div>';
  });

  describe('joue le bruit du tapis', () => {
    beforeEach(() => {
      situation = new Situation({
        sequenceKlaxons: []
      });
      const mockDepotRessource = new class {
        fondSonore () {
          return new MockAudioNode();
        }
      }();
      vue = new VueFondSonore(situation, mockDepotRessource);
    });

    it("ne joue rien à l'affichage", () => {
      let jouee = 0;
      vue.audio.start = e => jouee++;
      vue.affiche('#pointInsertion');
      expect(jouee).to.equal(0);
    });

    it("joue à l'état DEMARRE", () => {
      let jouee = 0;
      vue.audio.start = e => jouee++;
      situation.modifieEtat(DEMARRE);
      vue.affiche('#pointInsertion');

      expect(jouee).to.equal(1);
    });

    it("stoppe lorsque c'est fini", () => {
      let stope = 0;
      vue.audio.stop = e => stope++;
      vue.affiche('#pointInsertion');
      situation.modifieEtat(FINI);
      expect(stope).to.equal(1);
    });
  });

  describe('joue les klaxons', () => {
    let audioKlaxon;

    beforeEach(() => {
      situation = new Situation({
        sequenceKlaxons: [1, 1]
      });
      audioKlaxon = new MockAudioNode();
      const mockDepotRessource = new class {
        fondSonore () {
          return new MockAudioNode();
        }

        klaxon () {
          return audioKlaxon;
        }
      }();
      vue = new VueFondSonore(situation, mockDepotRessource);
    });

    it("joue à l'état DEMARRE", function (done) {
      let jouee = 0;
      audioKlaxon.start = e => {
        jouee++;
        if (jouee === 2) done();
      };
      situation.modifieEtat(DEMARRE);
      vue.affiche('#pointInsertion');
    });

    it("stoppe si c'est fini", function (done) {
      let jouee = 0;
      audioKlaxon.start = e => jouee++;
      situation.modifieEtat(DEMARRE);
      vue.affiche('#pointInsertion');
      situation.modifieEtat(FINI);

      setTimeout(() => {
        expect(jouee).to.equal(0);
        done();
      }, 5);
    });
  });
});
