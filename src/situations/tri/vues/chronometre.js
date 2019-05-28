import chronometre from 'tri/assets/chronometre.png';
import aiguilleSeconde from 'tri/assets/aiguille-seconde.png';
import aiguilleMinute from 'tri/assets/aiguille-minute.png';
import { CHANGEMENT_ETAT, DEMARRE, FINI } from 'commun/modeles/situation';

export default class VueChronometre {
  constructor (situation) {
    this.situation = situation;
    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      this.definisEtatDuChronometre(etat);
    });
  }

  affiche (pointInsertion, $) {
    $(pointInsertion).append('<div class="chronometre-container"></div>');
    this.chronometreConteneur = $('.chronometre-container');
    const chronometreContenu = `<img class='chronometre' src="${chronometre}">
                                <img class='aiguille-minute' src=${aiguilleMinute}>
                                <img class='aiguille-seconde' src=${aiguilleSeconde}>`;
    this.chronometreConteneur.append(chronometreContenu);
  }

  definisEtatDuChronometre (etat) {
    if (etat === DEMARRE) {
      this.activeChronometre();
    } else if (etat === FINI) {
      this.stopChronometre();
    }
  }

  activeChronometre () {
    this.chronometreConteneur.addClass('actif');
  }

  stopChronometre () {
    this.chronometreConteneur.removeClass('actif');
  }
}
