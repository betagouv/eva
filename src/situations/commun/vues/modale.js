import { traduction } from 'commun/infra/internationalisation';

import 'commun/styles/overlay.scss';
import 'commun/styles/modale.scss';

export function afficheFenetreModale ($pointInsertion, $, message, actionOk) {
  const $modale = $(`<div id="fenetre-modale" class="overlay">
    <div class="fenetre">
    <label>${message}</label>
    <div class="buttons">
    <button id="OK-modale">${traduction('situation.modale.ok')}</button>
    <button id="annuler-modale">${traduction('situation.modale.annuler')}</button>
    </div>
    </div>
    </div>`);
  $pointInsertion.append($modale);

  $('#OK-modale').on('click', () => {
    actionOk();
    $modale.remove();
  });

  $('#annuler-modale').on('click', () => {
    $modale.remove();
  });
}
