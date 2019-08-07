export default function joueConsigne (depot, jouerConsigneCommune, lectureTerminee) {
  function joueSon (noeudSon, callbackFin) {
    noeudSon.start();
    setTimeout(callbackFin, noeudSon.buffer.duration * 1000);
  }

  function joueConsigneCommune () {
    joueSon(depot.consigneCommune(), lectureTerminee);
  }

  joueSon(depot.consigne(),
    jouerConsigneCommune ? joueConsigneCommune : lectureTerminee);
}
