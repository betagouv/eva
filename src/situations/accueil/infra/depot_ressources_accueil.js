import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import fondAccueil from 'accueil/assets/fond-accueil.jpg';
import casque from 'commun/assets/casque.svg';
import personnage from 'accueil/assets/personnage.png';
import precedent from 'accueil/assets/precedent.svg';
import suivant from 'accueil/assets/suivant.svg';
import avatarFin from 'accueil/assets/avatar-fin.png';
import consigneAccueil from 'accueil/assets/consigne_accueil.wav';
import avatarAvis from 'accueil/assets/avatar-avis.svg';
import avatarDeconnexion from 'accueil/assets/avatar-deconnexion.svg';
import boutonAvis from 'accueil/assets/bouton-avis.svg';

const batimentsContext = require.context('../assets', false, /batiment-.+\.png$/);

export default class DepotRessourcesAccueil extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, consigneAccueil);
    this.charge([fondAccueil, personnage, precedent, suivant, casque, avatarFin, avatarAvis, avatarDeconnexion, boutonAvis]);
    this.chargeContexte(batimentsContext);
    this.batiments = batimentsContext.keys().reduce((memo, fichier) => {
      memo[fichier.match(/batiment-(.+)\.png/)[1]] = batimentsContext(fichier);
      return memo;
    }, {});
  }

  fondAccueil () {
    return this.ressource(fondAccueil);
  }

  personnage () {
    return this.ressource(personnage);
  }

  precedent () {
    return this.ressource(precedent);
  }

  suivant () {
    return this.ressource(suivant);
  }

  casque () {
    return this.ressource(casque);
  }

  avatarFin () {
    return this.ressource(avatarFin);
  }

  avatarAvis () {
    return this.ressource(avatarAvis);
  }

  avatarDeconnexion () {
    return this.ressource(avatarDeconnexion);
  }

  existeBatimentSituation (situation) {
    return !!this.batiments[situation];
  }

  batimentSituation (situation) {
    return this.ressource(this.batiments[situation]);
  }

  boutonAvis () {
    return this.ressource(boutonAvis);
  }
}
