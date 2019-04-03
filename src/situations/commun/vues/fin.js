import 'commun/styles/fin.scss';

export class VueFin {
  affiche (pointInsertion, $) {
    var boutonStop = $('#stop');
    var boutonTerminer = $("<a href='/' class='bouton-terminer'>Terminer</a>");
    boutonStop.replaceWith(boutonTerminer);
    $(pointInsertion).append(`<div class='message-succes'> C'est réussi, bravo !</div>`);
  }
}
