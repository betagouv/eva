const lexiqueNormale = [
  'anxieux',
  'apeuré',
  'craintes',
  'inquiet',
  'nerveux',
  'tendu',
  'content',
  'serein',
  'confiant',
  'enthousiaste',
  'optimiste',
  'ravi',
  'assises',
  'ajusta',
  'couchant',
  'ivresse',
  'navires',
  'tissu',
  'compter',
  'satyre',
  'chameaux',
  'enchaînement',
  'ouvrières',
  'revu',
  'tyanose',
  'canole',
  'cradisse',
  'bougure',
  'salubale',
  'vidor',
  'défeter',
  'lompon',
  'revensir',
  'maripolatron',
  'heulenter',
  'peil',
  'sormier',
  'foriune',
  'traipe',
  'cirances',
  'sopaire',
  'chancoup',
  'roudo',
  'rotute',
  'sanquet',
  'bimace',
  'tosseau',
  'délubéropent',
  'endigneur',
  'colu',
  'angoissé',
  'joyeux',
  'jetait',
  'acrobate',
  'roulbau',
  'tesfon'
];

const lexiqueEntrainement = [
  'jamais',
  'menthol',
  'profondément',
  'tilure',
  'cabyale',
  'pourmignetes'
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
