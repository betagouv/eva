import '../styles/stock.scss';

import donneesStock from '../data/stock.json';
import donneesVueStock from '../data/vueStock.json';
import { creeMagasin } from '../modeles/magasin.js';
import { uneVueStock } from '../vues/stock.js';

import { initialiseFormulaireSaisieInventaire } from './formulaireSaisieInventaire.js';

export function afficheMagasin (pointInsertion, $) {
  uneVueStock(donneesVueStock)
    .init(pointInsertion)
    .affiche(donneesStock.contenants);

  let magasin = creeMagasin(donneesStock);
  initialiseFormulaireSaisieInventaire(magasin, pointInsertion, $);
}
