import rapporteAuJournal from 'securite/modeles/rapporteur';
import EvenementQualificationDanger from 'securite/modeles/evenement_qualification_danger';
import { creeStore, FINI } from 'securite/store/store';

describe('Le rapporteur', function () {
  it('il rapporte les dangers qualifiés au journal', function (done) {
    const store = creeStore();
    const journal = {};
    rapporteAuJournal(store, journal);
    journal.enregistre = (evenement) => {
      expect(evenement).to.be.a(EvenementQualificationDanger);
      expect(evenement.donnees()).to.eql({ danger: 'danger1', reponse: 'bonne' });
      done();
    };
    store.commit('ajouteDangerQualifie', { nom: 'danger1', choix: 'bonne' });
  });

  it('il ne rapporte que les dangers qualifiés au journal', function () {
    let compteurAppelEnregistre = 0;
    const store = creeStore();
    const journal = {};
    rapporteAuJournal(store, journal);
    journal.enregistre = (evenement) => {
      compteurAppelEnregistre++;
    };
    store.commit('modifieEtat', FINI);
    expect(compteurAppelEnregistre).to.eql(0);
  });
});
