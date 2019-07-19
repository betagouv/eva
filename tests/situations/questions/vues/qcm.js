import jsdom from 'jsdom-global';
import jQuery from 'jquery';

import VueQCM, { EVENEMENT_REPONSE } from 'questions/vues/qcm';

describe('La vue de la question QCM', function () {
  let $;
  let srcResource;
  let question;

  beforeEach(function () {
    jsdom('<div id="point-insertion"></div>');
    $ = jQuery(window);
    srcResource = '';
    question = { choix: [] };
  });

  it('affiche des radios', function () {
    question.choix = [1, 2, 3, 4, 5];
    const $vue = new VueQCM(question, srcResource);
    expect($('#point-insertion input[type=radio]').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion input[type=radio]').length).to.equal(5);
  });

  it("affiche l'image", function () {
    const $vue = new VueQCM(question, 'palette');
    expect($('#point-insertion .question-illustration').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion .question-illustration').length).to.equal(1);
    expect($('#point-insertion .question-illustration').attr('src'))
      .to.equal('palette');
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const $vue = new VueQCM(question, srcResource);
    expect($('#point-insertion #envoi-reponse').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion #envoi-reponse').length).to.equal(1);
  });

  it('emet un événément réponse quand on appuie sur le bouton envoi', function (done) {
    question.choix = [{ id: '32' }];
    const $vue = new VueQCM(question, srcResource);

    $vue.affiche('#point-insertion', $);
    $('#point-insertion input[type=radio][value=32]').prop('checked', true);
    $vue.on(EVENEMENT_REPONSE, (reponse) => {
      expect(reponse).to.eql('32');
      done();
    });

    $('#point-insertion #envoi-reponse').click();
  });
});
