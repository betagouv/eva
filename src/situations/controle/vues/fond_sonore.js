import 'controle/styles/tapis.scss';

import { DEMARRE, CHANGEMENT_ETAT } from 'commun/modeles/situation';
import fondSonore from 'controle/assets/fond_sonore.mp3';

export default class VueFondSonore {
  constructor (situation) {
    this.situation = situation;
    this.audio = new window.Audio(fondSonore);
    this.audio.loop = true;
  }

  affiche (pointInsertion, $) {
    this.changeEtat(pointInsertion, $);
    this.situation.on(CHANGEMENT_ETAT, () => {
      this.changeEtat(pointInsertion, $);
    });
  }

  changeEtat (pointInsertion, $) {
    if (this.situation.etat() === DEMARRE) {
      this.audio.play();
    } else {
      this.audio.pause();
    }
  }
}
