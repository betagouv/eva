import pluralize from 'pluralize';

export class VueContenu {
  init (pointInsertion) {
    this.element = document.getElementById('contenu');
    if (this.element) {
      this.element.remove();
    }
    this.element = document.createElement('div');
    this.element.id = 'contenu';
    document.getElementById(pointInsertion).appendChild(this.element);
    this.element.classList.add('invisible');
  }

  cacher () {
    this.element.classList.replace('visible', 'invisible');
  }

  estVisible () {
    return this.element.classList.value.split(' ').includes('visible');
  }

  affiche (contenant) {
    this.element.innerHTML = `
      <label class="type" id="nom">${contenant.nom}</label>
      <div class="quantite">
        <label id="quantite">${contenant.quantite}</label>
        <label id="unite">${pluralize('litre', contenant.quantite)}</label>
      </div>
    `;
    this.element.classList.replace('invisible', 'visible');
  }
}
