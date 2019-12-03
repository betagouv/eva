import { CHANGEMENT_ETAT, FINI } from 'commun/modeles/situation';
import Situation, { EVENEMENT_REPONSE } from 'questions/modeles/situation';

describe('Le modèle de la situation « Questions »', function () {
  let situation;

  beforeEach(function () {
    this.question1 = { type: 'redaction_note' };
    this.question2 = { type: 'qcm', choix: [{ id: 1, type_choix: 'bon' }] };
    situation = new Situation();
    situation.questions([this.question1, this.question2]);
  });

  it('peut donner la question actuelle', function () {
    expect(situation.question()).to.eql(this.question1);
  });

  it('peut répondre à la question actuelle et émettre un événement', function (done) {
    situation.on(EVENEMENT_REPONSE, (question, reponse) => {
      expect(question).to.eql(this.question1);
      expect(reponse).to.eql('Ma réponse');
      done();
    });
    expect(situation.repond('Ma réponse'));
  });

  it("n'incremente pas le résultat lorsque l'on répond a une question de type rédaction note", function () {
    expect(situation.repond('Ma réponse'));
    expect(situation.resultat).to.eql({
      bon: 0,
      mauvais: 0,
      abstention: 0
    });
  });

  it("incremente le résultat bon lorsque l'on répond à une question de type qcm", function () {
    situation.questions([{ type: 'qcm', choix: [{ id: 1, type_choix: 'bon' }] }]);
    expect(situation.repond(1));
    expect(situation.resultat).to.eql({
      bon: 1,
      mauvais: 0,
      abstention: 0
    });
  });

  it("incremente le résultat mauvais lorsque l'on répond a une question de type qcm", function () {
    situation.questions([{ type: 'qcm', choix: [{ id: 1, type_choix: 'mauvais' }] }]);
    expect(situation.repond(1));
    expect(situation.resultat).to.eql({
      bon: 0,
      mauvais: 1,
      abstention: 0
    });
  });

  it('une fois une question répondu, donne une nouvelle question', function () {
    expect(situation.repond('Ma réponse'));
    expect(situation.question()).to.eql(this.question2);
  });

  it('une fois toutes les questions répondue, passe la situation en fini', function () {
    const evenementsRecusDansLOrdre = [];
    situation.on(EVENEMENT_REPONSE, () => evenementsRecusDansLOrdre.push(EVENEMENT_REPONSE));
    situation.on(CHANGEMENT_ETAT, (etat) => evenementsRecusDansLOrdre.push(etat));
    expect(situation.repond('Ma réponse'));
    expect(situation.question()).to.eql(this.question2);
    expect(situation.repond(this.question2.choix[0].id));
    expect(situation.question()).to.eql(undefined);
    expect(situation.etat()).to.eql(FINI);
    expect(evenementsRecusDansLOrdre).to.eql([EVENEMENT_REPONSE, EVENEMENT_REPONSE, FINI]);
  });
});
