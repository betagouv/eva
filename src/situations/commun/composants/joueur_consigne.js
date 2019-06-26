export default function joueConsigne ($, depot, jouerConsigneCommune, lectureTerminee) {
  function joueSon (noeudSon, callbackFin) {
    $(noeudSon).on('ended', callbackFin);
    noeudSon.start();
  }

  function joueConsigneCommune () {
    joueSon(depot.consigneCommune(), lectureTerminee);
  }

  joueSon(depot.consigne(),
    jouerConsigneCommune ? joueConsigneCommune : lectureTerminee);
}
