import AppAgendaEntrainement from '../assets/app-agenda-entrainement.png';
import AppAgenda from '../assets/app-agenda.png';
import AppPhoto from '../assets/app-photo.png';
import AppRappels from '../assets/app-rappels.png';
import Fin from '../assets/fin.png';
import choix1 from 'maintenance/assets/consigne_demarrage.wav';

const questionAgendaEntrainement = {
  id: 'agenda-entrainement',
  illustration: AppAgendaEntrainement,
  intitule: 'Voici le téléphone de Sophie, que faisait Sophie ce matin ?',
  choix: [
    {
      id: '1',
      intitule: 'Elle distribuait le courrier'
    },
    {
      id: '2',
      intitule: "Elle s'occupait du zoo"
    },
    {
      id: '3',
      intitule: 'Elle réalisait un travail administratif'
    },
    {
      id: '4',
      intitule: 'Elle distribuait les colis'
    }
  ]
};

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

const questionRappels = {
  id: 'rappels',
  illustration: AppRappels,
  intitule: 'Que Sophie doit-elle penser à faire ?',
  choix: [
    {
      id: '1',
      intitule: 'Sortir les poubelles'
    },
    {
      id: '2',
      intitule: 'Sortir le chien'
    },
    {
      id: '3',
      intitule: 'Sortir le chat'
    },
    {
      id: '4',
      intitule: 'Sortir le soleil'
    },
    {
      id: '5',
      intitule: 'Sortir la loutre'
    }
  ]
};

const questionFin1 = {
  id: 'fin1',
  illustration: Fin,
  intitule: 'Où est Sophie à 14h ?',
  choix: [
    {
      id: '1',
      intitule: 'A la librairie'
    },
    {
      id: '2',
      intitule: 'Au bureau'
    },
    {
      id: '3',
      intitule: 'A la grande roue'
    },
    {
      id: '4',
      intitule: 'Au zoo'
    },
    {
      id: '5',
      intitule: "A l'entrée"
    }
  ]
};

const questionFin2 = {
  id: 'fin2',
  illustration: Fin,
  intitule: 'Pourquoi deviez-vous chercher Sophie ?',
  choix: [
    {
      id: '1',
      intitule: "Pour lui dire que le planning a été modifié et qu'elle doit prendre votre poste cet après-midi"
    },
    {
      id: '2',
      intitule: 'Pour lui demander son aide dans la conception du planning'
    },
    {
      id: '3',
      intitule: 'Pour lui dire de'
    },
    {
      id: '4',
      intitule: 'Pour lui demander de bien vouloir vous proposer'
    }
  ]
};

const questionFin3 = {
  id: 'fin3',
  illustration: Fin,
  intitule: 'Avec qui Sophie a t-elle déjeuné ?',
  choix: [
    {
      id: '1',
      intitule: 'Denis'
    },
    {
      id: '2',
      intitule: 'Richard'
    },
    {
      id: '3',
      intitule: 'Michel'
    },
    {
      id: '4',
      intitule: 'Alexis'
    },
    {
      id: '5',
      intitule: 'Mickael'
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
    agenda: [questionAgendaEntrainement]
  }
};
const configurationNormale = {
  apps: {
    photos: [questionPhoto],
    repondeur: [question1],
    rappels: [questionRappels],
    agenda: [questionAgenda],
    messages: [question1, question2]
  },
  questionsFin: [questionFin1, questionFin2, questionFin3]
};

export { configurationEntrainement, configurationNormale };
