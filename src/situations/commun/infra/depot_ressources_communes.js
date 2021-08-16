import DepotRessources from 'commun/infra/depot_ressources';
import casque from 'commun/assets/casque.svg';
import calculatrice from 'commun/assets/calculatrice.svg';
import son from 'commun/assets/son.svg';
import sonConsigneCommune from 'commun/assets/consigne_commune.wav';
import sonConsigneBlanche from 'commun/assets/consigne_blanche.wav';

const ILLUSTRATIONS = require.context('../assets/illustration_questions');

export default class DepotRessourcesCommunes extends DepotRessources {
  constructor (chargeurs, sonConsigneDemarrage, sonConsigneTransition = sonConsigneBlanche) {
    super(chargeurs);
    this.charge([casque, son, calculatrice,
      sonConsigneCommune, sonConsigneDemarrage, sonConsigneTransition]);
    this.sonConsigneDemarrage = sonConsigneDemarrage;
    this.sonConsigneTransition = sonConsigneTransition;
    this.chargeContexte(ILLUSTRATIONS);
    this.illustrationQuestions = ILLUSTRATIONS.keys().reduce((memo, fichier) => {
      memo[fichier.match(/\.\/(.+)$/)[1]] = ILLUSTRATIONS(fichier);
      return memo;
    }, {});
  }

  consigneDemarrage () {
    return this.ressource(this.sonConsigneDemarrage);
  }

  consigneTransition () {
    return this.ressource(this.sonConsigneTransition);
  }

  consigneCommune () {
    return this.ressource(sonConsigneCommune);
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

  illustrationQuestion (nomFichier) {
    const fichier = this.illustrationQuestions[nomFichier];
    if (!fichier) return;
    return this.ressource(fichier);
  }
}
