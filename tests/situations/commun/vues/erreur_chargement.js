import jsdom from 'jsdom-global';

import VueErreurChargement from 'commun/vues/erreur_chargement';
import { traduction } from 'commun/infra/internationalisation';

describe('vue erreur chargement', function () {
  let $;
  let vue;

  beforeEach(() => {
    jsdom('<div id="pointInsertion"></div>');
    $ = jQuery(window);
    vue = new VueErreurChargement();
  });

  it('affiche les informations', () => {
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-erreur-chargement').length).to.eql(1);
    expect($('#pointInsertion .message').text()).to.eql(traduction('situation.erreur_chargement'));
  });
});
