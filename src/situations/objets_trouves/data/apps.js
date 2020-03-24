import AppAgendaEntrainement from '../assets/app-agenda-entrainement.png';
import AppAgenda from '../assets/app-agenda.png';
import AppPhoto from '../assets/app-photo.png';
import AppRappels from '../assets/app-rappels.png';
import Fin from '../assets/fin.png';
import choix1 from 'maintenance/assets/consigne_demarrage.wav';
import AppMessage1 from '../assets/app-message1.png';
import AppMessage2 from '../assets/app-message2.png';
import AppMessage3 from '../assets/app-message3.png';
import entree from '../assets/entree.svg';
import golf from '../assets/golf.svg';
import restaurant from '../assets/restaurant.svg';
import toilettes from '../assets/toilettes.svg';
import zoo from '../assets/zoo.svg';
import iconeAgenda from '../assets/icone-agenda.png';
import iconePhotos from '../assets/icone-photos.png';
import iconeNotes from '../assets/icone-notes.png';
import iconeRepondeur from '../assets/icone-repondeur.png';
import iconeMessages from '../assets/icone-messages.png';

const questionAgendaEntrainement = {
  id: 'agenda-entrainement',
  couleur: '#4ED7E0',
  icone: iconeAgenda,
  illustration: AppAgendaEntrainement,
  intitule: 'Voici le téléphone de Sophie. Que faisait Sophie ce matin ?',
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
  couleur: '#FE6E91',
  icone: iconePhotos,
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
  couleur: '#4ED7E0',
  illustration: AppAgenda,
  icone: iconeAgenda,
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
  couleur: '#FECD6E',
  icone: iconeNotes,
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

const questionMessage1 = {
  id: 'message1',
  couleur: '#63D7AD',
  icone: iconeMessages,
  illustration: AppMessage1,
  intitule: 'A quel bureau Sophie devrait-elle se rendre tout à l’heure ?',
  choix: [
    {
      id: '1',
      intitule: '51'
    },
    {
      id: '2',
      intitule: '61'
    },
    {
      id: '3',
      intitule: '71'
    },
    {
      id: '4',
      intitule: '81'
    },
    {
      id: '5',
      intitule: '91'
    }
  ]
};

const questionMessage2 = {
  id: 'message2',
  couleur: '#63D7AD',
  icone: iconeMessages,
  illustration: AppMessage2,
  intitule: 'Dans quelle salle de jeu Sophie a-t-elle décidé d’aller ?',
  choix: [
    {
      id: '1',
      intitule: 'salle 1 : capacité 80 personnes, 50€'
    },
    {
      id: '2',
      intitule: 'salle 2 : capacité 90 personnes, 60€'
    },
    {
      id: '3',
      intitule: 'salle 3 : capacité 105 personnes, 100€'
    },
    {
      id: '4',
      intitule: 'salle 4 : capacité 125 personnes, 150€'
    },
    {
      id: '5',
      intitule: 'salle 5 : capacité 15 personnes, 10€'
    }
  ]
};

const questionMessage3 = {
  id: 'message3',
  couleur: '#63D7AD',
  icone: iconeMessages,
  illustration: AppMessage3,
  intitule: 'Où Sophie devait-elle retrouver Dounia ?',
  choix: [
    {
      id: '1',
      image: restaurant
    },
    {
      id: '2',
      image: entree
    },
    {
      id: '3',
      image: toilettes
    },
    {
      id: '4',
      image: zoo
    },
    {
      id: '5',
      image: golf
    }
  ]
};

const question1 = {
  id: 1,
  couleur: '#5B7DD3',
  icone: iconeRepondeur,
  choix: [
    {
      id: '1',
      intitule: '1'
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
    messages: [questionMessage1, questionMessage2, questionMessage3]
  },
  questionsFin: [questionFin1, questionFin2, questionFin3]
};

export { configurationEntrainement, configurationNormale };
