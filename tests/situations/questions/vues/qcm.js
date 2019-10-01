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

  it("désactive le bouton lorsqu'aucune réponse n'est sélectionnée", function () {
    question.choix = [{ id: 'uid-32' }];
    const $vue = new VueQCM(question);
    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion #envoi-reponse').prop('disabled')).to.be(true);
    $('#point-insertion input[type=radio][value=uid-32]').prop('checked', true).trigger('input');
    expect($('#point-insertion #envoi-reponse').prop('disabled')).to.be(false);
  });

  it('emet un événement réponse quand on appuie sur le bouton envoi', function (done) {
    question.choix = [{ id: 'uid-32' }];
    const $vue = new VueQCM(question);

    $vue.affiche('#point-insertion', $);
    $('#point-insertion input[type=radio][value=uid-32]').prop('checked', true);
    $vue.on(EVENEMENT_REPONSE, (reponse) => {
      expect(reponse).to.equal('uid-32');
      done();
    });

    $('#point-insertion #envoi-reponse').click();
  });

  it('désactive le bouton une fois répondu pour éviter le double click', function (done) {
    question.choix = [{ id: 'uid-32' }];
    const $vue = new VueQCM(question);

    $vue.affiche('#point-insertion', $);
    $('#point-insertion input[type=radio][value=uid-32]').prop('checked', true).trigger('input');
    expect($('#point-insertion #envoi-reponse').prop('disabled')).to.be(false);
    $vue.on(EVENEMENT_REPONSE, (reponse) => {
      expect($('#point-insertion #envoi-reponse').prop('disabled')).to.be(true);
      done();
    });

    $('#point-insertion #envoi-reponse').click();
  });
});
