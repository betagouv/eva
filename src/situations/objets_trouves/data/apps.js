import AppPhoto from '../assets/app-photo.png';
import AppAgenda from '../assets/app-agenda.png';
import choix1 from 'maintenance/assets/consigne_demarrage.wav';

const questionPhoto = {
  id: 'photo',
  illustration: AppPhoto,
  intitule: "Qu'indique le badge de Denis ?",
  choix: [
    {
      id: '1',
      intitule: 'Il travaille dans le zoo'
    },
    {
      id: '2',
      intitule: 'Il déjeune dans le zoo'
    },
    {
      id: '3',
      intitule: "Il doit retrouver quelqu'un dans le zoo"
    },
    {
      id: '4',
      intitule: 'Il doit se déplacer au zoo'
    },
    {
      id: '5',
      intitule: 'Il est perdu dans le zoo'
    }
  ]
};

const questionAgenda = {
  id: 'agenda',
  illustration: AppAgenda,
  intitule: "Où Sophie doit-elle travailler de 14h30 à 16h, d'après son agenda ?",
  choix: [
    {
      id: '1',
      audio: choix1
    },
    {
      id: '2',
      audio: choix1
    },
    {
      id: '3',
      audio: choix1
    },
    {
      id: '4',
      audio: choix1
    },
    {
      id: '5',
      audio: choix1
    },
    {
      id: '6',
      audio: choix1
    }
  ]
};

const question1 = {
  id: 1,
  choix: [
    {
      id: '1',
      intitule: '1'
    }
  ]
};

const question2 = {
  id: 2,
  choix: [
    {
      id: '2',
      intitule: '2'
    }
  ]
};

const configurationEntrainement = {
  apps: {
    photos: question1
  }
};
const configurationNormale = {
  apps: {
    photos: questionPhoto,
    repondeur: question1,
    rappels: question1,
    agenda: questionAgenda,
    messages: question2
  },
  questionsFin: [question1, question2]
};

export { configurationEntrainement, configurationNormale };
