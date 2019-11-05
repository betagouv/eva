import 'commun/styles/commun.scss';
import 'inventaire/styles/contenu.scss';
import { traduction } from 'commun/infra/internationalisation';

// Attention de maintenir la cohérence avec le temps
// de la transition css (class contenu)
const DELAI_FERMETURE_CONTENANT_MILLISEC = 400;

export default class VueContenu {
  constructor (situation, pointInsertion, delaiFermeture = DELAI_FERMETURE_CONTENANT_MILLISEC) {
    this.situation = situation;
    this.calque = document.createElement('div');
    this.calque.id = 'calque';
    this.calque.classList.add('calque', 'invisible');
    this.calque.addEventListener('click', (event) => {
      this.element.classList.replace('ouvrir', 'fermer');
      setTimeout(() => {
        this.calque.classList.add('invisible');
        this.element.classList.add('invisible');
        this.element.remove();
        this.calque.remove();
      }, delaiFermeture);
      event.stopPropagation();
    });
    this.pointInsertion = pointInsertion;
  }

  position (position, dimensionFermee, dimensionOuvert) {
    return position + dimensionFermee / 2 - dimensionOuvert / 2;
  }

  affiche (contenant) {
    if (this.situation.aideActivee) {
      this.element = this.creeElementAvecAide(contenant);
    } else {
      this.element = this.creeElementSansAide(contenant);
    }
    this.element.classList.add('contenu', 'fermer', 'invisible');
    this.element.style.top = this.position(contenant.posY - contenant.hauteur, contenant.hauteur, contenant.dimensionsOuvert.hauteur) + '%';
    this.element.style.left = Math.max(0, this.position(contenant.posX, contenant.largeur, contenant.dimensionsOuvert.largeur)) + '%';
    this.element.style.height = contenant.dimensionsOuvert.hauteur + '%';
    this.element.style.width = contenant.dimensionsOuvert.largeur + '%';

    this.pointInsertion.appendChild(this.element);
    this.pointInsertion.appendChild(this.calque);

    this.calque.classList.remove('invisible');
    this.element.classList.remove('invisible');
    setTimeout(() => {
      this.element.classList.replace('fermer', 'ouvrir');
    }, 50);
  }

  creeElementSansAide (contenant) {
    const element = document.createElement('img');
    element.src = contenant.imageOuvert;

    return element;
  }

  creeElementAvecAide (contenant) {
    const element = document.createElement('div');
    element.classList.add('contenu-aide');
    if (contenant.quantite !== 0) {
      const img = document.createElement('img');
      img.src = contenant.contenu.image;
      element.append(img);
      const clefTraduction = contenant.contenu.forme === 'bidon' ? 'inventaire.aide_contenu_bidon' : 'inventaire.aide_contenu';
      const span = document.createElement('span');
      span.textContent = traduction(clefTraduction, { nombre: contenant.quantite, produit: contenant.contenu.nom });
      element.append(span);
    }

    return element;
  }
}
