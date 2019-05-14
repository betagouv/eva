import 'controle/styles/fin.scss';

import { traduction } from 'commun/infra/internationalisation';
import { CHANGEMENT_ETAT, FINI } from 'commun/modeles/situation';

export default class VueFin {
  constructor (situation) {
    this.situation = situation;
    this.situation.on(CHANGEMENT_ETAT, (etat) => {
      if (etat === FINI) {
        this.passeEnEtatFini();
      }
    });
  }

  affiche (pointInsertion, $) {
    this.$ = $;
    this.$overlay = $('<div class="overlay invisible"></div>');

    $(pointInsertion).append(this.$overlay);
  }

  passeEnEtatFini () {
    const $message = this.$('<div class="message-fin"></div>');
    for (let resultat in this.situation.resultat) {
      const message = traduction(`controle.resultat.${resultat}`, { nombre: this.situation.resultat[resultat] });
      $message.append(this.$(`<p>${message}</p>`));
    }
    this.$overlay.append($message);
    this.$overlay.removeClass('invisible');
  }
}
