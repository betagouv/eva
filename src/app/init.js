import '../styles/etageres.scss';

import donneesStock from '../data/stock.json';
import { creeMagasin } from '../modeles/magasin.js';
import { VueEtageres } from '../vues/etageres.js';
import { initialiseFormulaireSaisieInventaire } from '../vues/formulaireSaisieInventaire.js';

export function afficheMagasin (pointInsertion, $) {
  new VueEtageres(pointInsertion)
    .affiche(donneesStock.contenants);

  let magasin = creeMagasin(donneesStock);
  initialiseFormulaireSaisieInventaire(magasin, pointInsertion, $);
}
