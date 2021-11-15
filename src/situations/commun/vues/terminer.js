import { traduction } from 'commun/infra/internationalisation';
import { afficheFenetreModale } from 'commun/vues/modale';
import { SCOPE_URL } from 'commun/vues/affiche_situation';

import 'commun/styles/bouton.scss';

export default class VueTerminer {
  constructor (situation, depotRessources, retourAccueil = () => window.location.assign(SCOPE_URL)) {
    this.situation = situation;
    this.retourAccueil = retourAccueil;
  }

  affiche (pointInsertion, $) {
    const $message = $('<div id="message-fin"></div>');
    for (const resultat in this.situation.resultat) {
      const message = traduction(`${this.situation.identifiant}.resultat.${resultat}`, { nombre: this.situation.resultat[resultat] });
      $message.append($(`<p>${message}</p>`));
    }

    afficheFenetreModale(
      pointInsertion,
      $,
      {
        titre: traduction('situation.reussite'),
        boutonOk: traduction('situation.retour_accueil'),
        boutonAnnuler: false,
        message: $message.get(0).outerHTML,
        actionOk: this.retourAccueil
      }
    );
  }

  cache () {
  }
}
