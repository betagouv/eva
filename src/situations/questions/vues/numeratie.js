import 'commun/styles/boutons.scss';
import 'questions/styles/situation.scss';

import { traduction } from 'commun/infra/internationalisation';

import VueQuestion, { EVENEMENT_REPONSE } from './question';

export { EVENEMENT_REPONSE };

export default class VueNumeratie extends VueQuestion {
  affiche (pointInsertion, donneesQuestion, resource, $) {
    const valeurs = [donneesQuestion['valeur_1'],
      donneesQuestion['valeur_2'],
      donneesQuestion['valeur_3'],
      donneesQuestion['valeur_4'],
      donneesQuestion['valeur_5'],
      donneesQuestion['ne_sait_pas']];
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
        <img class="question-illustration" src=${resource}></img>
        <div class="question-barre">
          <p class="couleur-grise sans-marge">${donneesQuestion['description']}</p>
          <p class="sans-marge">${donneesQuestion['question']}</p>
          ${$valeursPossibles}
          <button id="envoi-reponse" class="question-bouton bouton-arrondi">
            ${traduction('questions.numeratie.valider')}
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
