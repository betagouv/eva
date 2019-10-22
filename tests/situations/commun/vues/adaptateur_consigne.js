import $ from 'jquery';

import Situation from 'commun/modeles/situation';
import AdaptateurConsigne from 'commun/vues/adaptateur_consigne.js';

describe("L'adaptateur de la vue Consigne", () => {
  let situation;
  let vue;

  beforeEach(() => {
    $('body').append('<div id="pointInsertion"></div>');
    situation = new Situation();
    const depotRessources = new class {
      casque () {
        return { src: 'chemin casque' };
      }
    }();
    vue = new AdaptateurConsigne(situation, depotRessources);
    vue.affiche('#pointInsertion', $);
  });

  it('affiche la vue consigne', () => {
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-arrondi').text()).to.eql('accueil.intro_consigne.bouton');
  });
});
