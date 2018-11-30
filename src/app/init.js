import '../styles/stock.scss';
import donneesStock from '../data/stock.json';
import donneesVueStock from '../data/vueStock.json';
import { uneVueStock } from '../../src/vues/stock.js';

export function afficheMagasin (pointInsertion, $) {
  $(pointInsertion).append('<div id="stock" class="stock"></div>');
  uneVueStock(donneesVueStock).affiche('stock', donneesStock.contenants);
}
