import '../styles/stock.scss';

import donneesStock from '../data/stock.json';
import donneesVueStock from '../data/vueStock.json';
import { creeMagasin } from '../modeles/magasin.js';
import { uneVueStock } from '../vues/stock.js';

import { initialiseFormulaireSaisieInventaire } from './formulaireSaisieInventaire.js';

export function afficheMagasin (pointInsertion, $) {
  $(pointInsertion).append('<div id="stock" class="stock"></div>');
  uneVueStock(donneesVueStock).affiche('stock', donneesStock.contenants);

  let magasin = creeMagasin(donneesStock);
  initialiseFormulaireSaisieInventaire(magasin, pointInsertion, $);
}
