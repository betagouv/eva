import $ from 'jquery';

import VueGo from 'commun/vues/go';
import Situation, { ENTRAINEMENT_DEMARRE, ENTRAINEMENT_FINI, DEMARRE } from 'commun/modeles/situation';
import { traduction } from 'commun/infra/internationalisation';

describe('vue Go', function () {
  let situation;
  let vue;

  beforeEach(() => {
    $('body').append('<div id="pointInsertion"></div>');
    situation = new Situation();
    vue = new VueGo(situation);
  });

  it('affiche les informations', () => {
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .overlay').length).to.eql(1);
    expect($('#pointInsertion .bouton-go').length).to.eql(1);
    expect($('#pointInsertion .message').text()).to.eql(traduction('situation.go'));
  });

  it('affiche des informations différentes lorsque le mode entrainement est disponible', () => {
    situation = new Situation(true);
    vue = new VueGo(situation);
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .bouton-go').length).to.eql(1);
    expect($('#pointInsertion .message').text()).to.eql(traduction('situation.entrainement_go'));
  });

  it('affiche des informations différentes lorsque le mode entrainement est disponible mais que celui ci est terminé', () => {
    situation = new Situation(true);
    situation.modifieEtat(ENTRAINEMENT_FINI);
    vue = new VueGo(situation);
    vue.affiche('#pointInsertion', $);
    expect($('#pointInsertion .bouton-go').length).to.eql(1);
    expect($('#pointInsertion .message').text()).to.eql(traduction('situation.entrainement_fini'));
  });

  it("au click, change l'état à DEMARRE", () => {
    vue.affiche('#pointInsertion', $);
    vue.click();
    expect(situation.etat()).to.eql(DEMARRE);
  });

  it("au click, change l'état à ENTRAINEMENT_DEMARRE lorsque le mode entrainement est disponible", () => {
    situation = new Situation(true);
    vue = new VueGo(situation);
    vue.affiche('#pointInsertion', $);
    vue.click();
    expect(situation.etat()).to.eql(ENTRAINEMENT_DEMARRE);
  });

  it("au click, change l'état à DEMARRE lorsque le mode entrainement est fini", () => {
    situation = new Situation(true);
    situation.modifieEtat(ENTRAINEMENT_FINI);
    vue = new VueGo(situation);
    vue.affiche('#pointInsertion', $);
    vue.click();
    expect(situation.etat()).to.eql(DEMARRE);
  });
});
