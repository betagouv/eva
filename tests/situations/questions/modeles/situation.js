import { FINI } from 'commun/modeles/situation';
import Situation, { EVENEMENT_REPONSE } from 'questions/modeles/situation';

describe('Le modèle de la situation « Questions »', function () {
  let situation;

  beforeEach(function () {
    situation = new Situation();
    situation.questions(['litteratie', 'numeratie']);
  });

  it('peut donner la question actuelle', function () {
    expect(situation.question()).to.eql('litteratie');
  });

  it('peut répondre à la question actuelle et émettre un événement', function (done) {
    situation.on(EVENEMENT_REPONSE, (question, reponse) => {
      expect(question).to.eql('litteratie');
      expect(reponse).to.eql('Ma réponse');
      done();
    });
    expect(situation.repond('Ma réponse'));
  });

  it('une fois une question réponse, donne une nouvelle question', function () {
    expect(situation.repond('litteratie', 'Ma réponse'));
    expect(situation.question()).to.eql('numeratie');
  });

  it('une fois toutes les questions répondue, passe la situation en fini', function () {
    expect(situation.repond('Ma réponse'));
    expect(situation.question()).to.eql('numeratie');
    expect(situation.repond('Ma réponse'));
    expect(situation.question()).to.eql(undefined);
    expect(situation.etat()).to.eql(FINI);
  });
});
