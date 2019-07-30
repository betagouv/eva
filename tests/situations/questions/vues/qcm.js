import $ from 'jquery';

import VueQCM, { EVENEMENT_REPONSE } from 'questions/vues/qcm';

describe('La vue de la question QCM', function () {
  let question;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    question = { choix: [] };
  });

  it('affiche des radios', function () {
    question.choix = [1, 2, 3, 4, 5];
    const $vue = new VueQCM(question);
    expect($('#point-insertion input[type=radio]').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion input[type=radio]').length).to.equal(5);
  });

  it("affiche l'image", function () {
    question.illustration = 'palette';
    const $vue = new VueQCM(question);
    expect($('#point-insertion .question-illustration').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion .question-illustration').length).to.equal(1);
    expect($('#point-insertion .question-illustration').attr('src'))
      .to.equal('palette');
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const $vue = new VueQCM(question);
    expect($('#point-insertion #envoi-reponse').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion #envoi-reponse').length).to.equal(1);
  });

  it('emet un événément réponse quand on appuie sur le bouton envoi', function (done) {
    question.choix = [{ id: '32' }];
    const $vue = new VueQCM(question);

    $vue.affiche('#point-insertion', $);
    $('#point-insertion input[type=radio][value=32]').prop('checked', true);
    $vue.on(EVENEMENT_REPONSE, (reponse) => {
      expect(reponse).to.eql('32');
      done();
    });

    $('#point-insertion #envoi-reponse').click();
  });
});
