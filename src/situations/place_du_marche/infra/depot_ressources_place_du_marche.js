import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'commun/assets/consigne_blanche.mp3';
import fondSituation from 'bienvenue/assets/bienvenue_background.jpg';


const messagesAudios = {};
const messagesVideos = {};

export default class DepotRessourcesPlaceDuMarche extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, messagesAudios, null, sonConsigne);
    this.charge([fondSituation]);
  }

  illustrationQuestion () {
    return this.ressource(fondSituation);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }
}
