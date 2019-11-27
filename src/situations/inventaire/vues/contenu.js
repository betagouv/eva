import 'commun/styles/commun.scss';
import 'inventaire/styles/contenu.scss';
import { traduction } from 'commun/infra/internationalisation';
import EvenementFermetureContenant from 'inventaire/modeles/evenement_fermeture_contenant';

// Attention de maintenir la cohérence avec le temps
// de la transition css (class contenu)
const DELAI_FERMETURE_CONTENANT_MILLISEC = 400;

export default class VueContenu {
  constructor (situation, pointInsertion, journal, delaiFermeture = DELAI_FERMETURE_CONTENANT_MILLISEC) {
    this.situation = situation;
    this.calque = document.createElement('div');
    this.calque.id = 'calque';
    this.calque.classList.add('calque');
    this.pointInsertion = pointInsertion;
    this.journal = journal;
    this.delaiFermeture = delaiFermeture;
  }

  ferme (contenant) {
    this.calque.addEventListener('click', (e) => {
      this.element.classList.replace('ouvrir', 'fermer');
      this.journal.enregistre(new EvenementFermetureContenant({ contenant: contenant.id }));
      setTimeout(() => {
        this.element.remove();
        this.calque.remove();
      }, this.delaiFermeture);
    }, { once: true });
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
    this.element.classList.add('contenu', 'fermer');
    this.element.style.top = this.position(contenant.posY - contenant.hauteur, contenant.hauteur, contenant.dimensionsOuvert.hauteur) + '%';
    this.element.style.left = Math.max(0, this.position(contenant.posX, contenant.largeur, contenant.dimensionsOuvert.largeur)) + '%';
    this.element.style.height = contenant.dimensionsOuvert.hauteur + '%';
    this.element.style.width = contenant.dimensionsOuvert.largeur + '%';

    this.pointInsertion.appendChild(this.element);
    this.pointInsertion.appendChild(this.calque);

    setTimeout(() => {
      this.element.classList.replace('fermer', 'ouvrir');
    }, 50);
    this.ferme(contenant);
  }

  creeElementSansAide (contenant) {
    const element = document.createElement('img');
    element.src = contenant.imageOuvert;

    return element;
  }

  creeElementAvecAide (contenant) {
    const element = document.createElement('div');
    element.classList.add('contenu-aide');
    element.style.backgroundColor = contenant.couleur;
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
