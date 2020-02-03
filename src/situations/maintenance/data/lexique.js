const EMOTION_PEUR = 'emotion-peur';
const EMOTION_POSITIVE = 'emotion-positive';
const NEUTRE = 'neutre';
const NON_MOT = 'non-mot';

const lexiqueNormale = [
  { mot: 'angoissé', type: EMOTION_PEUR },
  { mot: 'anxieux', type: EMOTION_PEUR },
  { mot: 'apeuré', type: EMOTION_PEUR },
  { mot: 'craintes', type: EMOTION_PEUR },
  { mot: 'inquiet', type: EMOTION_PEUR },
  { mot: 'nerveux', type: EMOTION_PEUR },
  { mot: 'tendu', type: EMOTION_PEUR },
  { mot: 'joyeux', type: EMOTION_POSITIVE },
  { mot: 'content', type: EMOTION_POSITIVE },
  { mot: 'serein', type: EMOTION_POSITIVE },
  { mot: 'confiant', type: EMOTION_POSITIVE },
  { mot: 'enthousiaste', type: EMOTION_POSITIVE },
  { mot: 'optimiste', type: EMOTION_POSITIVE },
  { mot: 'ravi', type: EMOTION_POSITIVE },
  { mot: 'acrobate', type: NEUTRE },
  { mot: 'assises', type: NEUTRE },
  { mot: 'ajusta', type: NEUTRE },
  { mot: 'couchant', type: NEUTRE },
  { mot: 'ivresse', type: NEUTRE },
  { mot: 'navires', type: NEUTRE },
  { mot: 'tissu', type: NEUTRE },
  { mot: 'compter', type: NEUTRE },
  { mot: 'satyre', type: NEUTRE },
  { mot: 'chameaux', type: NEUTRE },
  { mot: 'enchaînement', type: NEUTRE },
  { mot: 'jetait', type: NEUTRE },
  { mot: 'ouvrières', type: NEUTRE },
  { mot: 'revu', type: NEUTRE },
  { mot: 'tyanose', type: NON_MOT },
  { mot: 'canole', type: NON_MOT },
  { mot: 'cradisse', type: NON_MOT },
  { mot: 'bougure', type: NON_MOT },
  { mot: 'salubale', type: NON_MOT },
  { mot: 'vidor', type: NON_MOT },
  { mot: 'défeter', type: NON_MOT },
  { mot: 'lompon', type: NON_MOT },
  { mot: 'revensir', type: NON_MOT },
  { mot: 'maripolatron', type: NON_MOT },
  { mot: 'heulenter', type: NON_MOT },
  { mot: 'peil', type: NON_MOT },
  { mot: 'sormier', type: NON_MOT },
  { mot: 'foriune', type: NON_MOT },
  { mot: 'traipe', type: NON_MOT },
  { mot: 'cirances', type: NON_MOT },
  { mot: 'sopaire', type: NON_MOT },
  { mot: 'chancoup', type: NON_MOT },
  { mot: 'roudo', type: NON_MOT },
  { mot: 'rotute', type: NON_MOT },
  { mot: 'sanquet', type: NON_MOT },
  { mot: 'bimace', type: NON_MOT },
  { mot: 'tosseau', type: NON_MOT },
  { mot: 'délubéropent', type: NON_MOT },
  { mot: 'endigneur', type: NON_MOT },
  { mot: 'colu', type: NON_MOT },
  { mot: 'roulbau', type: NON_MOT },
  { mot: 'tesfon', type: NON_MOT }
];

const lexiqueEntrainement = [
  { mot: 'jamais', type: NEUTRE },
  { mot: 'menthol', type: NEUTRE },
  { mot: 'profondément', type: NEUTRE },
  { mot: 'tilure', type: NON_MOT },
  { mot: 'cabyale', type: NON_MOT },
  { mot: 'pourmignetes', type: NON_MOT }
];

function shuffle (a) {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const configurationEntrainement = { lexique: lexiqueEntrainement };
const configurationNormale = { lexique: shuffle(lexiqueNormale) };

export { configurationEntrainement, configurationNormale };
