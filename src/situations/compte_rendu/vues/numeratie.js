import 'commun/styles/boutons.scss';
import 'compte_rendu/styles/situation.scss';

import { traduction } from 'commun/infra/internationalisation';

import VueQuestion, { EVENEMENT_REPONSE } from './question';

export { EVENEMENT_REPONSE };

export default class VueNumeratie extends VueQuestion {
  affiche (pointInsertion, $) {
    const valeurs = [144, 288, 32, 384, 624, traduction('qcm.numeratie.ne_sait_pas')];
    const $valeursPossibles = valeurs.map((valeur) => {
      return `
        <div class="question-choix">
          <label>
            <input name="numeratie" type="radio" value="${valeur}" />
            ${valeur}
          </label>
        </div>
      `;
    }).join('');
    this.$vue = $(`
      <div id="numeratie" class="question">
        <img class="question-illustration" src=${this.depotRessources.palette().src}></img>
        <div class="question-barre">
          <p class="couleur-grise sans-marge">${traduction('qcm.numeratie.description')}</p>
          <p class="sans-marge">${traduction('qcm.numeratie.question')}</p>
          ${$valeursPossibles}
          <button id="envoi-reponse" class="bouton-reponse bouton-arrondi">
            ${traduction('qcm.numeratie.valider')}
          </button>
        </div
      </div>
    `);

    $(pointInsertion).append(this.$vue);
    $('#envoi-reponse', this.$vue).click(() => {
      const reponse = $('input[name="numeratie"]:checked').val();
      this.emit(EVENEMENT_REPONSE, reponse);
    });
  }
}
