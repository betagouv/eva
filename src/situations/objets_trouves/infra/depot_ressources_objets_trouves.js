import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigneBlanche from 'commun/assets/consigne_blanche.wav';

import fondSituation from '../assets/accueil.png';
import appPhoto from '../assets/app-photo.png';

import sonChoix1 from 'objets_trouves/assets/reponse_jardin_acclimatation.wav';
import sonChoix2 from 'objets_trouves/assets/reponse_jardin_cirque.wav';
import sonChoix3 from 'objets_trouves/assets/reponse_bateau_cirque.wav';
import sonChoix4 from 'objets_trouves/assets/reponse_bateau_cactus.wav';
import sonChoix5 from 'objets_trouves/assets/reponse_zoo_vautours.wav';
import sonChoix6 from 'objets_trouves/assets/reponse_zoo_tigres.wav';

const choixReponsesAudioQcm = {
  agenda: [sonChoix1, sonChoix2, sonChoix3, sonChoix4, sonChoix5, sonChoix6]
};

export default class DepotRessourcesObjetsTrouves extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigneBlanche, sonConsigneBlanche);
    this.charge([fondSituation, appPhoto]);
    this.charge(choixReponsesAudioQcm.agenda);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }

  reponseAudio (nomQcm, numeroReponse) {
    const reponses = choixReponsesAudioQcm[nomQcm];
    if (!reponses) return;
    return reponses[numeroReponse - 1];
  }
}
