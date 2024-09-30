import { orientation } from './orientation';
import { parcoursBas } from './parcours_bas';
import { parcoursHaut1, parcoursHaut2 } from './parcours_haut';

import { ORIENTATION, PARCOURS_BAS, PARCOURS_HAUT_1, PARCOURS_HAUT_2 } from '../modeles/store.js';

const configurationNormale = {
  questions: {
    [ORIENTATION]: orientation,
    [PARCOURS_BAS]: parcoursBas,
    [PARCOURS_HAUT_1]: parcoursHaut1,
    [PARCOURS_HAUT_2]: parcoursHaut2
  }};

export { configurationNormale };
