import DepotRessources from 'commun/infra/depot_ressources';
import casque from 'commun/assets/casque.svg';
import calculatrice from 'commun/assets/calculatrice.svg';
import iconeDeconnexion from 'commun/assets/sign_out.svg';
import son from 'commun/assets/son.svg';
import sonConsigneBlanche from 'commun/assets/consigne_blanche.mp3';

export default class DepotRessourcesCommunes extends DepotRessources {
  constructor (chargeurs, messagesAudios, sonConsigneDemarrage, sonConsigneTransition = sonConsigneBlanche) {
    super(chargeurs);
    this.charge([casque, son, calculatrice, sonConsigneDemarrage, sonConsigneTransition, iconeDeconnexion]);
    this.charge(Object.values(messagesAudios));
    this.sonConsigneDemarrage = sonConsigneDemarrage;
    this.sonConsigneTransition = sonConsigneTransition;
    this.messagesAudios = messagesAudios;
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

  messageAudio (nomTechnique) {
    return this.ressource(this.messagesAudios[nomTechnique]);
  }

  existeMessageAudio (nomTechnique) {
    return nomTechnique in this.messagesAudios;
  }
}
