import { pourcentageX, pourcentageY } from 'commun/data/scene';

const BON = 'bon';
const MAUVAIS = 'mauvais';

const configurationEntrainement = {
  zones: [
    {
      x: pourcentageX(770),
      y: pourcentageY(380),
      r: pourcentageX(80),
      id: 'entrainement',
      action_prevention: [
        {
          image: 'prevention-entrainement-gauche',
          type: BON
        },
        {
          image: 'prevention-entrainement-droite',
          type: MAUVAIS
        }
      ]
    }
  ]
};
const configurationNormale = {
  zones: [
    {
      x: pourcentageX(100),
      y: pourcentageY(460),
      r: pourcentageX(80),
      id: 'fuite-camion-citerne',
      action_prevention: [
        {
          image: 'prevention-fuite-gauche',
          type: BON
        }, {
          image: 'prevention-fuite-droite',
          type: MAUVAIS
        }
      ]
    },
    {
      x: pourcentageX(450),
      y: pourcentageY(390),
      r: pourcentageX(80),
      id: 'alcool-pelleteuse',
      action_prevention: [
        {
          image: 'prevention-alcool-gauche',
          type: MAUVAIS
        },
        {
          image: 'prevention-alcool-droite',
          type: BON
        }
      ]
    },
    {
      x: pourcentageX(490),
      y: pourcentageY(250),
      r: pourcentageX(80),
      id: 'peintre',
      action_prevention: [
        {
          image: 'prevention-peintre-gauche',
          type: MAUVAIS
        },
        {
          image: 'prevention-peintre-droite',
          type: BON
        }
      ]
    },
    {
      x: pourcentageX(750),
      y: pourcentageY(340),
      r: pourcentageX(80),
      id: 'fuite-gaz',
      action_prevention: [
        {
          image: 'prevention-gaz-gauche',
          type: BON
        },
        {
          image: 'prevention-gaz-droite',
          type: MAUVAIS
        }
      ]
    },
    {
      x: pourcentageX(870),
      y: pourcentageY(420),
      r: pourcentageX(80),
      id: 'trou',
      action_prevention: [
        {
          image: 'prevention-trou-gauche',
          type: MAUVAIS
        },
        {
          image: 'prevention-trou-droite',
          type: BON
        }
      ]
    }
  ]
};

export { configurationEntrainement, configurationNormale };
