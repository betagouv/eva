import jsdom from 'jsdom-global';
import RegistreUtilisateur, { CLEF_IDENTIFIANT } from 'commun/infra/registre_utilisateur';

describe('le registre utilisateur', function () {
  function unRegistre (id, nom) {
    return new RegistreUtilisateur({
      ajax (data) {
        return Promise.resolve({ id, nom });
      }
    });
  }
  beforeEach(function () {
    jsdom('', { url: 'http://localhost' });
  });

  it("permet d'inscrire et de récupérer un utilisateur", function () {
    const registre = unRegistre(1, 'autre test');
    registre.inscris('test').then(() => {
      expect(registre.nom()).to.eql('autre test');
      expect(registre.identifiant()).to.eql(1);
    });
  });

  it("envoie les données au serveur à l'inscription", function (done) {
    const registre = new RegistreUtilisateur({
      ajax (payload) {
        expect(payload.data).to.equal('{"nom":"nom utilisateur","code_campagne":"campagne1"}');
        done();
      }
    });
    registre.inscris('nom utilisateur', 'campagne1');
  });

  it('permet de récupérer les situations faites au début', function () {
    const registre = new RegistreUtilisateur();
    expect(registre.situationsFaites()).to.eql([]);
  });

  it('permet de sauvegarder et de récupérer les situations faites', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    expect(registre.situationsFaites()).to.eql(['tri']);
  });

  it('permet de sauvegarder plusieurs situations faites', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    registre.enregistreSituationFaite('controle');
    expect(registre.situationsFaites()).to.eql(['tri', 'controle']);
  });

  it('ne sauvegarde pas plusieurs fois la même situation', function () {
    const registre = new RegistreUtilisateur();
    registre.enregistreSituationFaite('tri');
    registre.enregistreSituationFaite('tri');
    expect(registre.situationsFaites()).to.eql(['tri']);
  });

  it('à la déconnexion, le registre est vidé', function () {
    const registre = unRegistre(1, 'test');
    return registre.inscris('test').then(() => {
      registre.enregistreSituationFaite('tri');
      registre.deconnecte();
      expect(registre.identifiant()).to.equal(undefined);
      expect(registre.nom()).to.equal(undefined);
      expect(registre.situationsFaites()).to.eql([]);
    });
  });

  it("s'initialise vide si d'anciennes données sont présentes", function () {
    window.localStorage.setItem(CLEF_IDENTIFIANT, 'nom utilisateur');
    const registre = new RegistreUtilisateur();
    expect(registre.identifiant()).to.equal(undefined);
    expect(registre.nom()).to.equal(undefined);
  });
});
