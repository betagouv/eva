import Situation from 'commun/modeles/situation';
import Evenement from 'commun/modeles/evenement_stop';

describe('toutes les situations', function () {
  it("peuvent être notifié d'un evement", function (done) {
    const uneSituation = new Situation();
    const unEvenement = new Evenement();
    uneSituation.observe(Evenement, (evenement) => {
      expect(evenement).to.equal(unEvenement);
      done();
    });

    uneSituation.notifie(unEvenement);
  });

  it("peuvent enregistrer plusieurs observateurs d'un evenement", function () {
    const uneSituation = new Situation();
    let notifications = 0;
    uneSituation.observe(Evenement, () => {
      notifications++;
    });
    uneSituation.observe(Evenement, () => {
      notifications++;
    });

    uneSituation.notifie(new Evenement());

    expect(notifications).to.equal(2);
  });

  it('peut notifier un evenement inconnu', function () {
    const uneSituation = new Situation();
    uneSituation.notifie(new Evenement());
  });
});
