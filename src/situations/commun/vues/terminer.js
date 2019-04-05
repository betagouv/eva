import { traduction } from 'commun/infra/internationalisation';

import 'commun/styles/terminer.scss';

export default class VueTerminer {
  affiche (pointInsertion, $) {
    const $actions = $('<div class="actions"></div>');
    const boutonTerminer = $(`<a href='/' class='bouton-terminer'>${traduction('situation.terminer')}</a>`);
    $actions.append(boutonTerminer);
    $actions.append(`<div class='message-succes'>${traduction('situation.reussite')}</div>`);
    $(pointInsertion).append($actions);
  }

  cache () {}
}
