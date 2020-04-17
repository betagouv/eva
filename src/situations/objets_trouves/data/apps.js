import AppAgendaEntrainement from '../assets/app-agenda-entrainement.png';
import AppAgenda from '../assets/app-agenda.png';
import AppPhoto from '../assets/app-photo.png';
import AppRappels from '../assets/app-rappels.png';
import AppDeverrouillage from '../assets/app-deverrouillage.png';
import Fin from '../assets/fin.png';
import AppMessage1 from '../assets/app-message1.png';
import AppMessage2 from '../assets/app-message2.png';
import AppMessage3 from '../assets/app-message3.png';
import AppRepondeur1 from '../assets/app-repondeur1.png';
import AppRepondeur2 from '../assets/app-repondeur2.png';
import entree from '../assets/entree.svg';
import golf from '../assets/golf.svg';
import restaurant from '../assets/restaurant.svg';
import toilettes from '../assets/toilettes.svg';
import zoo from '../assets/zoo.svg';
import iconeAgenda from '../assets/icone-agenda.png';
import iconePhotos from '../assets/icone-photos.png';
import iconeNotes from '../assets/icone-notes.png';
import iconeMessages from '../assets/icone-messages.png';
import iconeRepondeur from '../assets/icone-repondeur.png';
import iconeDeverrouillage from '../assets/icone-deverrouillage.png';

const questionAgendaEntrainement = {
  id: 'agenda-entrainement',
  icone: iconeAgenda,
  illustration: AppAgendaEntrainement,
  intitule: 'Voici le téléphone de Sophie. Que faisait Sophie ce matin ?',
  metacompetence: 'ccf',
  choix: [
    {
      id: '1',
      intitule: 'Elle distribuait le courrier',
      type_choix: 'bon'
    },
    {
      id: '2',
      intitule: "Elle s'occupait du zoo",
      type_choix: 'mauvais'
    },
    {
      id: '3',
      intitule: 'Elle réalisait un travail administratif',
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: 'Elle distribuait les colis',
      type_choix: 'mauvais'
    }
  ]
};

const questionPhoto = {
  id: 'photo',
  icone: iconePhotos,
  illustration: AppPhoto,
  intitule: "Qu'indique le badge de Denis ?",
  metacompetence: 'ccf',
  choix: [
    {
      id: '1',
      intitule: 'Il travaille dans le zoo',
      type_choix: 'bon'
    },
    {
      id: '2',
      intitule: 'Il déjeune dans le zoo',
      type_choix: 'mauvais'
    },
    {
      id: '3',
      intitule: "Il doit retrouver quelqu'un dans le zoo",
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: 'Il doit se déplacer au zoo',
      type_choix: 'mauvais'
    },
    {
      id: '5',
      intitule: 'Il est perdu dans le zoo',
      type_choix: 'mauvais'
    }
  ]
};

const questionDeverrouillage = {
  id: 'deverrouillage',
  illustration: AppDeverrouillage,
  icone: iconeDeverrouillage,
  description: 'Le téléphone de Sophie est verrouillé. Entrez le code de déverrouillage en utilisant l’indice laissé par Sophie pour lui permettre de ne pas oublier son mot de passe.',
  intitule: 'Quel est le mot de passe ?',
  extensionVue: 'ecran-telephone-deverrouillage',
  numerique: true,
  espacerChiffres: true,
  bonneReponse: '1800',
  metacompetence: 'numeratie'
};

const questionAgenda = {
  id: 'agenda',
  illustration: AppAgenda,
  icone: iconeAgenda,
  intitule: "Où Sophie doit-elle travailler de 14h30 à 16h, d'après son agenda ?",
  metacompetence: 'ccf',
  choix: [
    {
      id: 1,
      audio: 'agenda',
      type_choix: 'mauvais'
    },
    {
      id: 2,
      audio: 'agenda',
      type_choix: 'bon'
    },
    {
      id: 3,
      audio: 'agenda',
      type_choix: 'mauvais'
    },
    {
      id: 4,
      audio: 'agenda',
      type_choix: 'mauvais'
    },
    {
      id: 5,
      audio: 'agenda',
      type_choix: 'mauvais'
    },
    {
      id: 6,
      audio: 'agenda',
      type_choix: 'mauvais'
    }
  ]
};

const questionRappels = {
  id: 'rappels',
  icone: iconeNotes,
  illustration: AppRappels,
  intitule: 'Que Sophie doit-elle penser à faire ?',
  metacompetence: 'ccf',
  choix: [
    {
      id: '1',
      intitule: 'Sortir les poubelles',
      type_choix: 'mauvais'
    },
    {
      id: '2',
      intitule: 'Sortir le chien',
      type_choix: 'bon'
    },
    {
      id: '3',
      intitule: 'Sortir le chat',
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: 'Sortir le soleil',
      type_choix: 'mauvais'
    },
    {
      id: '5',
      intitule: 'Sortir la loutre',
      type_choix: 'mauvais'
    }
  ]
};

const questionFin1 = {
  id: 'fin1',
  illustration: Fin,
  intitule: 'Où est Sophie à 14h ?',
  metacompetence: 'memorisation',
  choix: [
    {
      id: '1',
      intitule: 'A la librairie',
      type_choix: 'mauvais'
    },
    {
      id: '2',
      intitule: 'Au bureau',
      type_choix: 'mauvais'
    },
    {
      id: '3',
      intitule: 'A la grande roue',
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: 'Au zoo',
      type_choix: 'mauvais'
    },
    {
      id: '5',
      intitule: "A l'entrée",
      type_choix: 'bon'
    }
  ]
};

const questionFin2 = {
  id: 'fin2',
  illustration: Fin,
  intitule: 'Pourquoi deviez-vous chercher Sophie ?',
  metacompetence: 'memorisation',
  choix: [
    {
      id: '1',
      intitule: "Pour lui dire que le planning a été modifié et qu'elle doit prendre votre poste cet après-midi",
      type_choix: 'bon'
    },
    {
      id: '2',
      intitule: 'Pour lui demander son aide dans la conception du planning de l’équipe',
      type_choix: 'mauvais'
    },
    {
      id: '3',
      intitule: 'Pour lui dire de vous accompagner à une activité dans le parc',
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: 'Pour lui demander de bien vouloir vous proposer des dates pour une réunion',
      type_choix: 'mauvais'
    }
  ]
};

const questionFin3 = {
  id: 'fin3',
  illustration: Fin,
  intitule: 'Avec qui Sophie a t-elle déjeuné ?',
  metacompetence: 'memorisation',
  choix: [
    {
      id: '1',
      intitule: 'Denis',
      type_choix: 'bon'
    },
    {
      id: '2',
      intitule: 'Richard',
      type_choix: 'mauvais'
    },
    {
      id: '3',
      intitule: 'Michel',
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: 'Alexis',
      type_choix: 'mauvais'
    },
    {
      id: '5',
      intitule: 'Mickael',
      type_choix: 'mauvais'
    }
  ]
};

const questionMessage1 = {
  id: 'quel-bureau',
  icone: iconeMessages,
  illustration: AppMessage1,
  intitule: 'À quel bureau Sophie devrait-elle se rendre tout à l’heure ?',
  metacompetence: 'numeratie',
  choix: [
    {
      id: '1',
      intitule: '51',
      type_choix: 'mauvais'
    },
    {
      id: '2',
      intitule: '61',
      type_choix: 'mauvais'
    },
    {
      id: '3',
      intitule: '71',
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: '81',
      type_choix: 'mauvais'
    },
    {
      id: '5',
      intitule: '91',
      type_choix: 'bon'
    }
  ]
};

const questionMessage2 = {
  id: 'quelle-salle-reserver',
  icone: iconeMessages,
  illustration: AppMessage2,
  intitule: 'Dans quelle salle de jeu Sophie a-t-elle décidé d’aller ?',
  metacompetence: 'numeratie',
  choix: [
    {
      id: '1',
      intitule: 'salle 1 : capacité 80 personnes, 50€',
      type_choix: 'bon'
    },
    {
      id: '2',
      intitule: 'salle 2 : capacité 90 personnes, 60€',
      type_choix: 'mauvais'
    },
    {
      id: '3',
      intitule: 'salle 3 : capacité 105 personnes, 100€',
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: 'salle 4 : capacité 125 personnes, 150€',
      type_choix: 'mauvais'
    },
    {
      id: '5',
      intitule: 'salle 5 : capacité 15 personnes, 10€',
      type_choix: 'mauvais'
    }
  ]
};

const questionMessage3 = {
  id: 'ou-retrouver-dounia',
  icone: iconeMessages,
  illustration: AppMessage3,
  intitule: 'Où Sophie devait-elle retrouver Dounia ?',
  metacompetence: 'ccf',
  choix: [
    {
      id: '1',
      image: restaurant,
      type_choix: 'mauvais'
    },
    {
      id: '2',
      image: entree,
      type_choix: 'bon'
    },
    {
      id: '3',
      image: toilettes,
      type_choix: 'mauvais'
    },
    {
      id: '4',
      image: zoo,
      type_choix: 'mauvais'
    },
    {
      id: '5',
      image: golf,
      type_choix: 'mauvais'
    }
  ]
};

const questionRepondeur1 = {
  id: 'heure-bureau-mickael',
  icone: iconeRepondeur,
  illustration: AppRepondeur1,
  intitule: 'A quelle heure devez-vous vous rendre dans le bureau de Mickael ?',
  extensionVue: 'lecture-message',
  metacompetence: 'ccf',
  choix: [
    {
      id: '1',
      intitule: '12h45',
      type_choix: 'mauvais'
    },
    {
      id: '2',
      intitule: '12h35',
      type_choix: 'mauvais'
    },
    {
      id: '3',
      intitule: '12h15',
      type_choix: 'mauvais'
    },
    {
      id: '4',
      intitule: '16h45',
      type_choix: 'mauvais'
    },
    {
      id: '5',
      intitule: '16h35',
      type_choix: 'mauvais'
    },
    {
      id: '6',
      intitule: '16h15',
      type_choix: 'mauvais'
    },
    {
      id: '7',
      intitule: '13h45',
      type_choix: 'bon'
    },
    {
      id: '8',
      intitule: '13h35',
      type_choix: 'mauvais'
    },
    {
      id: '9',
      intitule: '13h15',
      type_choix: 'mauvais'
    }
  ]
};

const questionRepondeur2 = {
  id: 'nombre-tours-de-manege',
  icone: iconeRepondeur,
  illustration: AppRepondeur2,
  description: 'Afin de rendre service à Sophie, vous décidez de répondre à sa place. Vous savez que Sophie lance un tour de manège pour 7 enfants.',
  intitule: 'Que répondez-vous ?',
  extensionVue: 'lecture-message',
  numerique: true,
  espacerChiffres: false,
  bonneReponse: '21',
  metacompetence: 'numeratie'
};

const configurationEntrainement = {
  apps: {
    agenda: [questionAgendaEntrainement]
  },
  consigneEcranAccueil: 'Veuillez cliquer sur l’application pour l’ouvrir.'
};
const configurationNormale = {
  appsAccueilVerrouille: {
    deverrouillage: [questionDeverrouillage]
  },
  apps: {
    photos: [questionPhoto],
    repondeur: [questionRepondeur1, questionRepondeur2],
    rappels: [questionRappels],
    agenda: [questionAgenda],
    messages: [questionMessage3, questionMessage1, questionMessage2]
  },
  consigneEcranAccueil:
    'Continuez à chercher Sophie en utilisant les indices que vous trouverez dans les différentes applications de son téléphone.',
  questionsFin: [questionFin1, questionFin2, questionFin3]
};

export { configurationEntrainement, configurationNormale };
