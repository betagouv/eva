import { orientation } from './orientation';
import { parcoursBas } from './parcours_bas';
import { parcoursHaut } from './parcours_haut';

import { ORIENTATION, PARCOURS_BAS, PARCOURS_HAUT } from '../modeles/store.js';

const configurationNormale = {
  [ORIENTATION]: orientation,
  [PARCOURS_BAS]: parcoursBas,
  [PARCOURS_HAUT]: parcoursHaut
};

export { configurationNormale };
