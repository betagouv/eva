import RegistreUtilisateur from 'commun/infra/registre_utilisateur';
import Progression from 'commun/modeles/progression';

export default class Utilisateur extends RegistreUtilisateur {
  // Note :
  // `Utilisateur` étend actuellement `RegistreUtilisateur` pour permettre de
  // séparer progressivement les comportements entre ces deux classes. À
  // (court) terme, l'idée est que `RegistreUtilisateur` soit une propriété
  // injectée à la construction de `Utilisateur`.

  constructor (situationsAccessibles) {
    super();
    this.situationsAccessibles = situationsAccessibles;
    this.metsAJourProgression();
  }

  declareSituationDebloquee (situation) {
    this.enregistreSituationDebloquee(situation);
    this.metsAJourProgression();
  }

  niveauActuel () {
    return this.progression.niveau();
  }

  nombreSituationsDebloquees () {
    return this.progression.debloque();
  }

  metsAJourProgression () {
    this.progression = new Progression(this.situationsDebloquees(), this.situationsAccessibles);
  }
}
