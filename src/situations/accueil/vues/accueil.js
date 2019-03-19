export class VueAccueil {
  constructor (situations) {
    this.situations = situations;
  }

  affiche (pointInsertion, $) {
    function creeElementSituation (situation) {
      return $(`
        <li>
          <a href="${situation.chemin}" class='bouton'>
            ${situation.nom}
            <i class="fas fa-caret-right"></i>
          </a>
        </li>
      `);
    }

    function creeElementListe (situations) {
      const $liste = $(`<ul></ul>`);
      const $elementsSituation = situations.map(s => { return creeElementSituation(s); });
      $liste.append(...$elementsSituation);
      return $liste;
    }

    const $situations = creeElementListe(this.situations);
    $(pointInsertion).append('<h1>Compétences pro</h1>');
    $(pointInsertion).append($situations);
  }
}
