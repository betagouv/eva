import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'objets_trouves/assets/consigne_demarrage_objets_trouves.mp3';
import sonConsigneTransition from 'objets_trouves/assets/consigne_transition_objets_trouves.mp3';

import fondSituation from '../assets/accueil.png';
import iconeDeverrouillageDebloque from '../assets/icone-deverrouillage-debloque.png';

import sonChoix1 from 'objets_trouves/assets/reponse_jardin_acclimatation.mp3';
import sonChoix2 from 'objets_trouves/assets/reponse_jardin_cirque.mp3';
import sonChoix3 from 'objets_trouves/assets/reponse_bateau_cirque.mp3';
import sonChoix4 from 'objets_trouves/assets/reponse_bateau_cactus.mp3';
import sonChoix5 from 'objets_trouves/assets/reponse_zoo_vautours.mp3';
import sonChoix6 from 'objets_trouves/assets/reponse_zoo_tigres.mp3';

import messageMickael from 'objets_trouves/assets/repondeur-message-mickael.mp3';
import messageRachel from 'objets_trouves/assets/repondeur-message-rachel.mp3';

const CHOIX_REPONSES_AUDIO_QCM = {
  agenda: [sonChoix1, sonChoix2, sonChoix3, sonChoix4, sonChoix5, sonChoix6]
};

const AUDIOS_QUESTIONS = {
  'heure-bureau-mickael': messageMickael,
  'nombre-tours-de-manege': messageRachel
};

export default class DepotRessourcesObjetsTrouves extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, AUDIOS_QUESTIONS, fondSituation, sonConsigne, sonConsigneTransition);
    this.charge([fondSituation, iconeDeverrouillageDebloque]);
    this.charge(CHOIX_REPONSES_AUDIO_QCM.agenda);
  }

  chargeRessourcesApps (apps) {
    if (apps) {
      Object.values(apps).forEach(app => {
        this.charge(app.map(question => question.illustration));
        this.charge(app.map(question => question.icone));
      });
    }
  }

  chargeConfigurations (configurationEntrainement, configurationNormale) {
    const configurations = [configurationEntrainement, configurationNormale];
    configurations.forEach((configuration) => {
      this.chargeRessourcesApps(configuration.apps);
      this.chargeRessourcesApps(configuration.appsAccueilVerrouille);
    });
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }

  reponseAudio (nomQcm, indexReponse) {
    const reponses = CHOIX_REPONSES_AUDIO_QCM[nomQcm];
    if (!reponses) return;
    return this.ressource(reponses[indexReponse]);
  }

  iconeDeverrouillageDebloque () {
    return this.ressource(iconeDeverrouillageDebloque);
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }
}
