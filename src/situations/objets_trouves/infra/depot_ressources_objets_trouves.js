import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'objets_trouves/assets/consigne_demarrage.wav';
import sonConsigneTransition from 'objets_trouves/assets/consigne_transition.wav';

import fondSituation from '../assets/accueil.png';
import fondDeverrouillage from '../assets/fond-vierge.jpg';
import iconeDeverrouillageDebloque from '../assets/icone-deverrouillage-debloque.png';

import appPhoto from '../assets/app-photo.png';

import sonChoix1 from 'objets_trouves/assets/reponse_jardin_acclimatation.wav';
import sonChoix2 from 'objets_trouves/assets/reponse_jardin_cirque.wav';
import sonChoix3 from 'objets_trouves/assets/reponse_bateau_cirque.wav';
import sonChoix4 from 'objets_trouves/assets/reponse_bateau_cactus.wav';
import sonChoix5 from 'objets_trouves/assets/reponse_zoo_vautours.wav';
import sonChoix6 from 'objets_trouves/assets/reponse_zoo_tigres.wav';

import messageMickael from 'objets_trouves/assets/repondeur-message-mickael.wav';
import messageRachel from 'objets_trouves/assets/repondeur-message-rachel.wav';

const CHOIX_REPONSES_AUDIO_QCM = {
  agenda: [sonChoix1, sonChoix2, sonChoix3, sonChoix4, sonChoix5, sonChoix6]
};

const MESSAGES = {
  'heure-bureau-mickael': messageMickael,
  'nombre-tours-de-manege': messageRachel
};

export default class DepotRessourcesObjetsTrouves extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne, sonConsigneTransition);
    this.charge([fondSituation, appPhoto, fondDeverrouillage, iconeDeverrouillageDebloque]);
    this.charge(CHOIX_REPONSES_AUDIO_QCM.agenda);
    this.charge(Object.values(MESSAGES));
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }

  reponseAudio (nomQcm, numeroReponse) {
    const reponses = CHOIX_REPONSES_AUDIO_QCM[nomQcm];
    if (!reponses) return;
    return reponses[numeroReponse - 1];
  }

  fondDeverrouillage () {
    return this.ressource(fondDeverrouillage);
  }

  iconeDeverrouillageDebloque () {
    return this.ressource(iconeDeverrouillageDebloque);
  }

  messageAudio (questionId) {
    return MESSAGES[questionId];
  }
}
