import { traduction } from 'commun/infra/internationalisation';

import 'commun/styles/overlay.scss';
import 'commun/styles/boutons.scss';
import 'commun/styles/modale.scss';

export function afficheFenetreModale (pointInsertion, $, message, actionOk) {
  const $modale = $(`<div id="fenetre-modale" class="overlay modale">
    <div>
      <h2>${message}</h2>
      <div class="buttons">
        <button id="OK-modale" class='bouton-arrondi'>${traduction('situation.modale.ok')}</button>
        <button id="annuler-modale" class='bouton-arrondi modal-annuler'>${traduction('situation.modale.annuler')}</button>
      </div>
    </div>
    </div>`);
  $(pointInsertion).append($modale);

  $('#OK-modale').on('click', () => {
    $modale.addClass('attendre');
    Promise.resolve(actionOk()).finally(() => {
      $modale.remove();
    });
  });

  $('#annuler-modale').on('click', () => {
    $modale.remove();
  });
}
