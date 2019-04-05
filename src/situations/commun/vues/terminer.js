import 'commun/styles/fin.scss';

export class VueTerminer {
  afficher (pointInsertion, $) {
    var boutonStop = $('#stop');
    var boutonTerminer = $("<a href='/' class='bouton-terminer'>Terminer</a>");
    boutonStop.remove();
    $(pointInsertion).append(boutonTerminer);
    $(pointInsertion).append(`<div class='message-succes'> C'est réussi, bravo !</div>`);
  }
}
