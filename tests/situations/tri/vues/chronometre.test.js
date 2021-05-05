import $ from 'jquery';

import { DEMARRE, FINI } from 'commun/modeles/situation';
import Situation from 'tri/modeles/situation';
import VueChronometre from 'tri/vues/chronometre';

describe('Le chronometre', function () {
  let situation;
  let mockDepotRessources;
  let vue;

  beforeEach(function () {
    $('body').append('<div id="pointInsertion"></div>');
    situation = new Situation({ pieces: [], bacs: [] });
    mockDepotRessources = new class {
      fondChronometre () {
        return { src: 'image-de-chronometre' };
      }

      aiguilleLongue () {
        return { src: 'image-aiguille-longue' };
      }

      aiguilleCourte () {
        return { src: 'image-aiguille-courte' };
      }
    }();
    vue = new VueChronometre(situation, mockDepotRessources);
    vue.affiche('#pointInsertion', $);
  });

  it("sait s'afficher dans une page web", function () {
    expect($('#pointInsertion .chronometre-container').length).toEqual(1);
    expect($('#pointInsertion .aiguille-minute').length).toEqual(1);
    expect($('#pointInsertion .aiguille-seconde').length).toEqual(1);
    expect($('#pointInsertion .chronometre-container.actif').length).toEqual(0);
  });

  it("s'active seulement quand la situation est en etat DEMARRE", function () {
    situation.modifieEtat(DEMARRE);
    expect($('#pointInsertion .chronometre-container.actif').length).toEqual(1);
  });

  it("s'arrete quand la situation est en etat FINI", function () {
    situation.modifieEtat(DEMARRE);
    expect($('#pointInsertion .chronometre-container.actif').length).toEqual(1);
    situation.modifieEtat(FINI);
    expect($('#pointInsertion .chronometre-container.actif').length).toEqual(0);
  });
});
