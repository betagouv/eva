import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'place_du_marche/assets/consigne_place_du_marche.mp3';
import fondSituation from 'bienvenue/assets/bienvenue_background.jpg';
import RegistreCampagne from 'commun/infra/registre_campagne';
import { extraitQuestionsReponsesAudios } from 'commun/infra/depot_ressources';

const messagesVideos = {};

export default class DepotRessourcesPlaceDuMarche extends DepotRessourcesCommunes {
  constructor (chargeurs, registreCampagne = new RegistreCampagne()) {
    const questionsServeur = registreCampagne.questions('place_du_marche');
    const messagesAudios = extraitQuestionsReponsesAudios(questionsServeur);
    super(chargeurs, messagesVideos, messagesAudios, null, sonConsigne);
    this.questionsServeur = questionsServeur;
    this.consigneEnCours = null;
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

  questions () {
    this.questionsServeur?.forEach(question => {
      if (question.choix) {
        question.choix.forEach(choix => {
          choix.bonneReponse = choix.type_choix === 'bon';
          delete choix.type_choix;
        });
      }
      if(question.type === 'clic-dans-image' || question.type === 'glisser-deposer') {
        question.extensionVue = question.type;
        delete question.type;
      }
    });
    return this.questionsServeur;
  }
}
