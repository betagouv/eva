const imagePieceConforme = require('controle/assets/biscuit-normal.png');

const imagesPiecesNonConformes = Array(19).fill().map((_, i) =>
  require(`controle/assets/def${i + 1}.png`)
);

export { imagePieceConforme, imagesPiecesNonConformes };
