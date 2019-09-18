import { traduction } from 'commun/infra/internationalisation';

import 'commun/styles/overlay.scss';
import 'commun/styles/boutons.scss';
import 'commun/styles/modale.scss';

export function afficheFenetreModale (pointInsertion, $,
  {
    titre,
    message = '',
    boutonOk = traduction('situation.modale.ok'),
    boutonAnnuler = traduction('situation.modale.annuler'),
    actionOk
  }) {
  const htmlAnnuler = boutonAnnuler ? `<button id="annuler-modale" class='bouton-arrondi modal-annuler'>${boutonAnnuler}</button>` : '';

  const $modale = $(`<div id="fenetre-modale" class="overlay modale">
    <div class="modale-interieur">
      <h2>${titre}</h2>
      <p>${message}</p>
      <div class="buttons">
        <button id="OK-modale" class='bouton-arrondi'>${boutonOk}</button>
        ${htmlAnnuler}
      </div>
    </div>
    </div>`);
  $(pointInsertion).append($modale);

  $('#OK-modale').on('click', () => {
    $modale.addClass('attendre');
    actionOk();
  });

  $('#annuler-modale').on('click', () => {
    $modale.remove();
  });
}
