import jsdom from 'jsdom-global';

import VueGo from 'commun/vues/go';
import Situation, { DEMARRE } from 'commun/modeles/situation';
import { traduction } from 'commun/infra/internationalisation';

describe('vue Go', function () {
  let situation;
  let $;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    situation = new Situation();
    vue = new VueGo(situation);
    vue.affiche('#pointInsertion', $);
  });

  it('affiche les informations', () => {
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-centre.bouton-go').length).to.eql(1);
    expect($('#pointInsertion .message').text()).to.eql(traduction('situation.go'));
  });

  it("au click, change l'état à DEMARRE", () => {
    vue.click();
    expect(situation.etat()).to.eql(DEMARRE);
  });
});
