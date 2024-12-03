import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'place_du_marche/assets/consigne_place_du_marche.mp3';
import fondSituation from 'bienvenue/assets/bienvenue_background.jpg';

const messagesVideos = {};
const messagesAudios = {};

export default class DepotRessourcesPlaceDuMarche extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, messagesAudios, null, sonConsigne);
    this.consigneEnCours = null;
    this.texteAide = null;
    this.charge([fondSituation]);
  }

  consigneDemarrage () {
    if (this.existeMessageAudio(this.consigneEnCours)) {
      return this.ressource(this.messagesAudios[this.consigneEnCours]);
    }
    return this.ressource(sonConsigne);
  }

  illustrationQuestion () {
    return this.ressource(fondSituation);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }
}
