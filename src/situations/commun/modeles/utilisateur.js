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
  }

  niveauActuel () {
    return this.progression().niveau();
  }

  nombreSituationsFaites () {
    return this.progression().fait();
  }

  progression () {
    const situationsAPrendreEnCompte = this.situationsFaites().filter(
      (situation) => this.situationsAccessibles.includes(situation)
    );
    return new Progression(situationsAPrendreEnCompte);
  }
}
