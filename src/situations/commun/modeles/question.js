/**
 * Extrait le nom technique sans la partie du variant.
 * @param {string} name - Le nom technique potentiellement avec un variant.
 * @returns {string} - Le nom technique sans le variant.
 */
export function nomTechniqueSansVariant(nomTechnique) {
  if (!nomTechnique) {
    return '';
  }
  return nomTechnique.split('__')[0];
}

