import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'inventaire/assets/consigne_demarrage.wav';
import croixRetourStock from 'inventaire/assets/croix.png';
import boutonSaisie from 'inventaire/assets/saisie-reponse.svg';
import loupe from 'inventaire/assets/loupe.svg';
import retour from 'inventaire/assets/retour.svg';

import reussite from 'inventaire/assets/reussite.wav';
import echec from 'inventaire/assets/echec.wav';

export default class DepotRessourcesInventaire extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, {}, sonConsigne);
    this.charge([croixRetourStock, boutonSaisie, loupe, retour]);
    this.charge([reussite, echec]);
    this.chargeContexte(require.context('../assets'));
  }

  croixRetourStock () {
    return this.ressource(croixRetourStock);
  }

  retourStock () {
    return this.ressource(retour);
  }

  loupe () {
    return this.ressource(loupe);
  }

  boutonSaisie () {
    return this.ressource(boutonSaisie);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }

  sonReussite () {
    return this.ressource(reussite);
  }

  sonEchec () {
    return this.ressource(echec);
  }
}
