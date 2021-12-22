import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'objets_trouves/assets/consigne_demarrage.wav';
import sonConsigneTransition from 'objets_trouves/assets/consigne_transition.wav';

import fondSituation from '../assets/accueil.png';
import iconeDeverrouillageDebloque from '../assets/icone-deverrouillage-debloque.png';

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

const AUDIOS_QUESTIONS = {
  'heure-bureau-mickael': messageMickael,
  'nombre-tours-de-manege': messageRachel
};

export default class DepotRessourcesObjetsTrouves extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne, sonConsigneTransition);
    this.charge([fondSituation, iconeDeverrouillageDebloque]);
    this.charge(CHOIX_REPONSES_AUDIO_QCM.agenda);
    this.charge(Object.values(AUDIOS_QUESTIONS));
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

  messageAudio (nomTechniqueQuestion) {
    return this.ressource(AUDIOS_QUESTIONS[nomTechniqueQuestion]);
  }

  existeMessageAudio (nomTechniqueQuestion) {
    return nomTechniqueQuestion in AUDIOS_QUESTIONS;
  }

  imageAideComplementaire () {
    return this.calculatrice();
  }
}
