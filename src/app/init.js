import '../styles/stock.scss';
import stock from '../data/stock.json';
import vueStock from '../data/vueStock.json';
import { uneVueStock } from '../../src/vues/stock.js';

export function afficheMagasin (pointInsertion, $) {
  $(pointInsertion).append('<div id="stock" class="stock"></div>');
  uneVueStock(vueStock).affiche('stock', stock.contenants);
}
