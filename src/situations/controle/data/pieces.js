const imagePieceConforme = require('controle/assets/biscuit-normal.png');

const imagesPiecesNonConformes = Array(19).fill().map((_, i) =>
  require(`controle/assets/def${i + 1}.png`)
);

const scenario = [
  true,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  true,
  false,
  true,
  false,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  false,
  true,
  true,
  false,
  true,
  true,
  true,
  true,
  true,
  false,
  false,
  true,
  false,
  true
];

export { scenario, imagePieceConforme, imagesPiecesNonConformes };
