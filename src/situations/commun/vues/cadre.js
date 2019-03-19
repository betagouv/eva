export class VueCadre {
  affiche (pointInsertion, $) {
    const $cadre = $('<div class="cadre"></div>');
    $(pointInsertion).append($cadre);
  }
}
