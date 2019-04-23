import 'commun/styles/barre_dev.scss';

import go from '../assets/play.svg';

import { CHANGEMENT_ETAT, ATTENTE_DEMARRAGE, DEMARRE, FINI } from '../modeles/situation';
import { traduction } from '../infra/internationalisation';

export default class VueBareDev {
  constructor (situation, preferencesDev) {
    this.situation = situation;
    this.preferencesDev = preferencesDev;
  }

  affiche (pointInsertion, $) {
    const $div = $('<div class="barre-dev"></div>');
    const $go = $(`<button class="bouton-go"><img src="${go}"></button>`);
    $go.on('click', () => {
      this.situation.modifieEtat(DEMARRE);
    });

    const $muet = $(`<button class="bouton-muet"></button>`);
    $muet.on('click', () => { this.basculeEtatMuet(pointInsertion, $); });

    const $confirmation = $(`<button class="bouton-confirmation"></button>`);
    $confirmation.on('click', () => { this.basculeEtatConfirmationQuitterEnCours(pointInsertion, $); });

    const $fini = $('<button class="bouton-fini">FIN</button>');
    $fini.on('click', () => {
      this.situation.modifieEtat(FINI);
    });
    $div.append($go, $muet, $confirmation, $fini);
    $(pointInsertion).append($div);

    this.metAJourEtatMuet(pointInsertion, $, this.etatMuet());
    this.metAjourConfirmationQuitterEnCours(pointInsertion, $, this.confirmationQuitterEnCours());
    this.situation.on(CHANGEMENT_ETAT, () => {
      this.metAJourEtat(pointInsertion, $);
    });
  }

  metAJourEtat (pointInsertion, $) {
    const etat = this.situation.etat();

    $('.bouton-go', pointInsertion).prop('disabled', etat !== ATTENTE_DEMARRAGE);
    $('.bouton-fini', pointInsertion).prop('disabled', etat === FINI);
  }

  basculeEtatMuet (pointInsertion, $) {
    const muet = !this.etatMuet();
    this.preferencesDev.enregistreEtatMuet(muet);
    this.metAJourEtatMuet(pointInsertion, $, muet);
  }

  etatMuet () {
    const muet = this.preferencesDev.consulteEtatMuet();
    if (muet === null) {
      return false;
    }
    return muet === 'true';
  }

  metAJourEtatMuet (pointInsertion, $, muet) {
    const audios = this.situation.audios;
    Object.keys(audios).forEach((audio) => {
      audios[audio].muted = muet;
    });
    const chaine = muet ? 'situation.barre-dev.sonore' : 'situation.barre-dev.muet';
    $('.bouton-muet', pointInsertion).text(traduction(chaine));
  }

  basculeEtatConfirmationQuitterEnCours (pointInsertion, $) {
    const confirmation = !this.confirmationQuitterEnCours();
    this.preferencesDev.enregistreEtatConfirmationQuitterEnCours(confirmation);
    this.metAjourConfirmationQuitterEnCours(pointInsertion, $, confirmation);
  }

  confirmationQuitterEnCours () {
    const confirmation = this.preferencesDev.consulteEtatConfirmationQuitterEnCours();
    if (confirmation === null) {
      return true;
    }
    return confirmation === 'true';
  }

  metAjourConfirmationQuitterEnCours (pointInsertion, $) {
    const chaine = this.confirmationQuitterEnCours() ? 'situation.barre-dev.pas-confirmation' : 'situation.barre-dev.confirmation';
    $('.bouton-confirmation', pointInsertion).text(traduction(chaine));
  }
}
