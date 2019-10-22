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

  it('affiche la vue consigne', function () {
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-arrondi').text()).to.eql('accueil.intro_consigne.bouton');
  });

  it('affiche le message de la consigne de la situation', function () {
    situation.identifiant = 'securite';
    expect(vue.message()).to.eql('securite.intro_contexte.message');
    situation.identifiant = 'tri';
    expect(vue.message()).to.eql('tri.intro_contexte.message');
  });
});
