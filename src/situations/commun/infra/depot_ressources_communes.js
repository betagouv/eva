import DepotRessources from 'commun/infra/depot_ressources';
import casque from 'commun/assets/casque.svg';
import calculatrice from 'commun/assets/calculatrice.svg';
import iconeDeconnexion from 'commun/assets/sign_out.svg';
import son from 'commun/assets/son.svg';
import sonConsigneBlanche from 'commun/assets/consigne_blanche.mp3';
import { extraitQuestionsReponsesAudios, extraitQuestionsServeurImages } from 'commun/infra/depot_ressources';

export default class DepotRessourcesCommunes extends DepotRessources {
  constructor (chargeurs, messagesVideos, messagesAudios, fondConsigne, sonConsigneDemarrage, sonConsigneTransition = sonConsigneBlanche, questionsServeur = []) {
    super(chargeurs);
    this.charge([casque, son, calculatrice, sonConsigneDemarrage, sonConsigneTransition, iconeDeconnexion]);
    this.charge(Object.values(messagesVideos));
    this.charge(Object.values(messagesAudios));
    const messagesAudiosServeur = extraitQuestionsReponsesAudios(questionsServeur);
    this.charge(Object.values(messagesAudiosServeur));
    const SVGs = extraitQuestionsServeurImages(questionsServeur);
    this.charge(Object.values(SVGs), 'inlineSvg');
    if (fondConsigne) {
      this.charge([fondConsigne]);
      this.imgFondConsigne = fondConsigne;
    }
    this.sonConsigneDemarrage = sonConsigneDemarrage;
    this.sonConsigneTransition = sonConsigneTransition;
    this.messagesVideos = messagesVideos;
    this.messagesAudios = { ...messagesAudios, ...messagesAudiosServeur };
    this.SVGs = SVGs;
    this.questionsServeur = questionsServeur;
  }

  fondConsigne () {
    return this.ressource(this.imgFondConsigne);
  }

  existeFondConsigne () {
    return !!this.imgFondConsigne;
  }

  consigneDemarrage () {
    return this.ressource(this.sonConsigneDemarrage);
  }

  consigneTransition () {
    return this.ressource(this.sonConsigneTransition);
  }

  casque () {
    return this.ressource(casque);
  }

  son () {
    return this.ressource(son);
  }

  calculatrice () {
    return this.ressource(calculatrice);
  }

  iconeDeconnexion () {
    return this.ressource(iconeDeconnexion);
  }

  messageVideo (nomTechnique) {
    return this.ressource(this.messagesVideos[nomTechnique]);
  }

  existeMessageVideo (nomTechnique) {
    return nomTechnique in this.messagesVideos;
  }

  messageAudio (nomTechnique) {
    return this.ressource(this.messagesAudios[nomTechnique]);
  }

  existeMessageAudio (nomTechnique) {
    return nomTechnique in this.messagesAudios;
  }

  existeSvg(nomTechnique) {
    return nomTechnique in this.SVGs;
  }

  trouveIllustrations(configuration) {
    if (! (configuration instanceof Object)) {
      return [];
    }
    let illustrations = [];
    if (Array.isArray(configuration)) {
      configuration.forEach(objet => {
        illustrations = illustrations.concat(this.trouveIllustrations(objet));
      });
    } else {
      ['illustration', 'icone'].forEach(key => {
        if (key in configuration) {
          illustrations.push(configuration[key]);
        }
      });
      Object.values(configuration).forEach(value => {
        illustrations = illustrations.concat(this.trouveIllustrations(value));
      });
    }
    return illustrations;
  }

  chargeIllustrationsConfigurations(configurations) {
    this.charge(this.trouveIllustrations(configurations));
  }

  illustrationQuestion(question) {
    return { src: question.illustration };
  }

  zoneCliquable (nomTechnique) {
    const nomTechniqueResource = `${nomTechnique}_zone_cliquable`;
    if (this.existeSvg(nomTechniqueResource)) {
      return this.ressource(this.SVGs[nomTechniqueResource]);
    }
  }

  imageAuClic (nomTechnique) {
    const nomTechniqueResource = `${nomTechnique}_image_au_clic`;
    if (this.existeSvg(nomTechniqueResource)) {
      return this.ressource(this.SVGs[nomTechniqueResource]);
    }
  }

  questions () {
    this.questionsServeur?.forEach(question => {
      if (question.choix) {
        question.choix.forEach(choix => {
          choix.bonneReponse = choix.type_choix === 'bon';
          delete choix.type_choix;
        });
      }
    });
    return this.questionsServeur;
  }
}
