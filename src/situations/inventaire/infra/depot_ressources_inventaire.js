import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

import sonConsigne from 'inventaire/assets/consigne_demarrage.mp3';

export default class DepotRessourcesInventaire extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(sonConsigne, chargeurs);
    const contexteRessourcesInventaire = require.context('inventaire/assets');
    const ressourcesInventaire = contexteRessourcesInventaire.keys().map(contexteRessourcesInventaire);
    this.charge(ressourcesInventaire);
  }
}
