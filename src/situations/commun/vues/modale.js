import { traduction } from 'commun/infra/internationalisation';

import 'commun/styles/overlay.scss';

export function afficheFenetreModale ($pointInsertion, $, message, actionOk) {
  const $modale = $(`<div id="fenetre-modale" class="overlay modale-stop">
    <label>${message}</label>
    <div class="buttons">
    <button id="annuler-modale" class='modal-annuler'>${traduction('situation.modale.annuler')}</button>
    <button id="OK-modale" class='modal-ok'>${traduction('situation.modale.ok')}</button>
    </div>
    </div>`);
  $pointInsertion.append($modale);

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
