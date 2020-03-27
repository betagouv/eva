import AppAgendaEntrainement from '../assets/app-agenda-entrainement.png';
import AppAgenda from '../assets/app-agenda.png';
import AppPhoto from '../assets/app-photo.png';
import AppRappels from '../assets/app-rappels.png';
import AppDeverrouillage from '../assets/app-deverrouillage.png';
import Fin from '../assets/fin.png';
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
import iconeMessages from '../assets/icone-messages.png';

const questionAgendaEntrainement = {
  id: 'agenda-entrainement',
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

const questionDeverouillage = {
  id: 'deverouillage',
  illustration: AppDeverrouillage,
  intitule: 'Le téléphone de Sophie est verrouillé. Entrez le code de déverrouillage en utilisant l’indice laissé par Sophie pour lui permettre de ne pas oublier son mot de passe.',
  question: 'Quel est le mot de passe ?'
};

const questionAgenda = {
  id: 'agenda',
  illustration: AppAgenda,
  icone: iconeAgenda,
  intitule: "Où Sophie doit-elle travailler de 14h30 à 16h, d'après son agenda ?",
  choix: [
    {
      id: 1,
      audio: 'agenda'
    },
    {
      id: 2,
      audio: 'agenda'
    },
    {
      id: 3,
      audio: 'agenda'
    },
    {
      id: 4,
      audio: 'agenda'
    },
    {
      id: 5,
      audio: 'agenda'
    },
    {
      id: 6,
      audio: 'agenda'
    }
  ]
};

const questionRappels = {
  id: 'rappels',
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
      intitule: 'Pour lui demander son aide dans la conception du planning de l’équipe'
    },
    {
      id: '3',
      intitule: 'Pour lui dire de vous accompagner à une activité dans le parc'
    },
    {
      id: '4',
      intitule: 'Pour lui demander de bien vouloir vous proposer des dates pour une réunion'
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
  id: 'quel-bureau',
  icone: iconeMessages,
  illustration: AppMessage1,
  intitule: 'À quel bureau Sophie devrait-elle se rendre tout à l’heure ?',
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
  id: 'quelle-salle-reserver',
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
  id: 'ou-retrouver-dounia',
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

const configurationEntrainement = {
  apps: {
    agenda: [questionAgendaEntrainement]
  },
  consigneEcranAccueil: 'Veuillez cliquer sur l’application pour l’ouvrir.'
};
const configurationNormale = {
  apps: {
    deverouillage: [questionDeverouillage],
    photos: [questionPhoto],
    rappels: [questionRappels],
    agenda: [questionAgenda],
    messages: [questionMessage3, questionMessage1, questionMessage2]
  },
  consigneEcranAccueil: 'Continuez à chercher Sophie en utilisant les indices que vous trouverez dans les différentes applications de son téléphone.',
  questionsFin: [questionFin1, questionFin2, questionFin3]
};

export { configurationEntrainement, configurationNormale };
