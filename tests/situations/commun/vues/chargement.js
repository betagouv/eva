import jsdom from 'jsdom-global';

import VueChargement from 'commun/vues/chargement';
import Situation, { CHARGEMENT, NON_DEMARRE } from 'commun/modeles/situation';
import { traduction } from 'commun/infra/internationalisation';

describe('vue chargement', function () {
  let situation;
  let $;
  let vue;
  let depotRessources;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation();
    depotRessources = { chargement () { return Promise.resolve(); } };
    vue = new VueChargement(situation, depotRessources);
  });

  it('affiche les informations', () => {
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-centre.bouton-chargement').length).to.eql(1);
    expect($('#pointInsertion .message').text()).to.eql(traduction('situation.chargement'));
  });

  it('passe la situation en NON_DEMARRE une fois le chargement terminé', function (done) {
    expect(situation.etat()).to.equal(CHARGEMENT);
    vue.affiche('#pointInsertion', $);
    depotRessources.chargement().then(() => {
      expect(situation.etat()).to.equal(NON_DEMARRE);
      done();
    });
  });
});
