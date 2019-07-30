import $ from 'jquery';

import VueRedactionNote, { EVENEMENT_REPONSE } from 'questions/vues/redaction_note';

describe('La vue de la question RedactionNote', function () {
  let question;

  beforeEach(function () {
    $('body').append('<div id="point-insertion"></div>');
    question = {};
  });

  it('affiche une zone de saisie de texte', function () {
    const $vue = new VueRedactionNote(question);
    expect($('#point-insertion #reponse-compte-rendu').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion #reponse-compte-rendu').length).to.equal(1);
  });

  it("affiche l'image de la question", function () {
    question.illustration = 'accident-carine';
    const $vue = new VueRedactionNote(question);
    expect($('#point-insertion .question-illustration').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion .question-illustration').length).to.equal(1);
    expect($('#point-insertion .question-illustration').attr('src'))
      .to.equal('accident-carine');
  });

  it("affiche un bouton d'envoi de réponse", function () {
    const $vue = new VueRedactionNote(question);
    expect($('#point-insertion #envoi-reponse').length).to.equal(0);

    $vue.affiche('#point-insertion', $);
    expect($('#point-insertion #envoi-reponse').length).to.equal(1);
  });

  it('emet un événément réponse quand on appuie sur le bouton envoi', function (done) {
    const $vue = new VueRedactionNote(question);

    $vue.affiche('#point-insertion', $);
    $('#point-insertion #reponse-compte-rendu').val('     Ma réponse  ');
    $vue.on(EVENEMENT_REPONSE, (reponse) => {
      expect(reponse).to.eql('Ma réponse');
      done();
    });

    $('#point-insertion #envoi-reponse').click();
  });
});
