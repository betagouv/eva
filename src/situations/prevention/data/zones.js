import { pourcentageX, pourcentageY } from 'commun/data/scene';

const configurationEntrainement = {
  zones: [
    {
      x: pourcentageX(770),
      y: pourcentageY(380),
      r: pourcentageX(80),
      id: 'entrainement',
      images_prevention: ['prevention-entrainement-gauche', 'prevention-entrainement-droite']
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
      images_prevention: ['prevention-fuite-gauche', 'prevention-fuite-droite']
    },
    {
      x: pourcentageX(450),
      y: pourcentageY(390),
      r: pourcentageX(80),
      id: 'alcool-pelleteuse',
      images_prevention: ['prevention-alcool-gauche', 'prevention-alcool-droite']
    },
    {
      x: pourcentageX(490),
      y: pourcentageY(250),
      r: pourcentageX(80),
      id: 'peintre',
      images_prevention: ['prevention-peintre-gauche', 'prevention-peintre-droite']
    },
    {
      x: pourcentageX(750),
      y: pourcentageY(340),
      r: pourcentageX(80),
      id: 'fuite-gaz',
      images_prevention: ['prevention-gaz-gauche', 'prevention-gaz-droite']
    },
    {
      x: pourcentageX(870),
      y: pourcentageY(420),
      r: pourcentageX(80),
      id: 'trou',
      images_prevention: ['prevention-trou-gauche', 'prevention-trou-droite']
    }
  ]
};

export { configurationEntrainement, configurationNormale };
