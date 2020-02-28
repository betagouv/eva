export default class JoueurConsigne {
  constructor (depot, ressourceConsigne) {
    this.depot = depot;
    this.ressourceConsigne = ressourceConsigne;
  }

  joueSon (noeudSon, callbackFin) {
    this.sonEnCours = noeudSon;
    noeudSon.start();
    this.cbTimer = setTimeout(callbackFin, noeudSon.buffer.duration * 1000);
  }

  joue (jouerConsigneCommune, lectureTerminee) {
    const joueConsigneCommune = () => {
      this.joueSon(this.depot.consigneCommune(), lectureTerminee);
    };
    this.joueSon(this.depot[this.ressourceConsigne](),
      jouerConsigneCommune ? joueConsigneCommune : lectureTerminee);
  }

  stop () {
    clearTimeout(this.cbTimer);
    this.sonEnCours.stop();
  }
}
