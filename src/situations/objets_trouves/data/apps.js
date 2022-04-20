import AppAgendaEntrainement from '../assets/app-agenda-entrainement.png';
import AppAgenda from '../assets/app-agenda.png';
import AppPhoto from '../assets/app-photo.png';
import AppNotes from '../assets/app-notes.png';
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
  description: 'Voici le téléphone de Sophie.',
  intitule: 'Que faisait Sophie ce matin ?',
  metacompetence: 'ccf',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: 'Elle distribuait le courrier',
      bonneReponse: true
    },
    {
      id: '2',
      intitule: "Elle s'occupait du zoo",
      bonneReponse: false
    },
    {
      id: '3',
      intitule: 'Elle réalisait un travail administratif',
      bonneReponse: false
    },
    {
      id: '4',
      intitule: 'Elle distribuait les colis',
      bonneReponse: false
    }
  ]
};

const questionPhoto = {
  id: 'photo',
  icone: iconePhotos,
  illustration: AppPhoto,
  intitule: "Qu'indique le badge de Denis ?",
  metacompetence: 'ccf',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: 'Il travaille dans le zoo',
      bonneReponse: true
    },
    {
      id: '2',
      intitule: 'Il déjeune dans le zoo',
      bonneReponse: false
    },
    {
      id: '3',
      intitule: "Il doit retrouver quelqu'un dans le zoo",
      bonneReponse: false
    },
    {
      id: '4',
      intitule: 'Il doit se déplacer au zoo',
      bonneReponse: false
    },
    {
      id: '5',
      intitule: 'Il est perdu dans le zoo',
      bonneReponse: false
    }
  ]
};

const questionDeverrouillage = {
  id: 'deverrouillage',
  type: 'champ-saisie',
  sous_type: 'numerique',
  espacerChiffres: true,
  illustration: AppDeverrouillage,
  icone: iconeDeverrouillage,
  description: 'Le téléphone de Sophie est verrouillé. Entrez le code de déverrouillage en utilisant l’indice laissé par Sophie pour lui permettre de ne pas oublier son mot de passe.',
  intitule: 'Quel est le mot de passe ?',
  extensionVue: 'ecran-telephone-deverrouillage',
  reponse: {
    texte: '1800'
  },
  metacompetence: 'numeratie'
};

const questionAgenda = {
  id: 'agenda',
  illustration: AppAgenda,
  icone: iconeAgenda,
  intitule: "Où Sophie doit-elle travailler de 14h30 à 16h, d'après son agenda ?",
  modalite_reponse: 'Écoutez chaque proposition en cliquant sur les hauts parleurs',
  metacompetence: 'ccf',
  type: 'qcm',
  choix: [
    {
      id: '1',
      audio: 'agenda',
      bonneReponse: false
    },
    {
      id: '2',
      audio: 'agenda',
      bonneReponse: true
    },
    {
      id: '3',
      audio: 'agenda',
      bonneReponse: false
    },
    {
      id: '4',
      audio: 'agenda',
      bonneReponse: false
    },
    {
      id: '5',
      audio: 'agenda',
      bonneReponse: false
    },
    {
      id: '6',
      audio: 'agenda',
      bonneReponse: false
    }
  ]
};

const questionNotes = {
  id: 'notes',
  icone: iconeNotes,
  illustration: AppNotes,
  intitule: 'Que Sophie doit-elle penser à faire ?',
  metacompetence: 'ccf',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: 'Sortir les poubelles',
      bonneReponse: false
    },
    {
      id: '2',
      intitule: 'Sortir le chien',
      bonneReponse: true
    },
    {
      id: '3',
      intitule: 'Sortir le chat',
      bonneReponse: false
    },
    {
      id: '4',
      intitule: 'Sortir le soleil',
      bonneReponse: false
    },
    {
      id: '5',
      intitule: 'Sortir la loutre',
      bonneReponse: false
    }
  ]
};

const questionFin1 = {
  id: 'fin1',
  illustration: Fin,
  intitule: 'Où est Sophie à 14h ?',
  metacompetence: 'memorisation',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: 'A la librairie',
      bonneReponse: false
    },
    {
      id: '2',
      intitule: 'Au bureau',
      bonneReponse: false
    },
    {
      id: '3',
      intitule: 'A la grande roue',
      bonneReponse: false
    },
    {
      id: '4',
      intitule: 'Au zoo',
      bonneReponse: false
    },
    {
      id: '5',
      intitule: "A l'entrée",
      bonneReponse: true
    }
  ]
};

const questionFin2 = {
  id: 'fin2',
  illustration: Fin,
  intitule: 'Pourquoi deviez-vous chercher Sophie ?',
  metacompetence: 'memorisation',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: "Pour lui dire que le planning a été modifié et qu'elle doit prendre votre poste cet après-midi",
      bonneReponse: true
    },
    {
      id: '2',
      intitule: 'Pour lui demander son aide dans la conception du planning de l’équipe',
      bonneReponse: false
    },
    {
      id: '3',
      intitule: 'Pour lui dire de vous accompagner à une activité dans le parc',
      bonneReponse: false
    },
    {
      id: '4',
      intitule: 'Pour lui demander de bien vouloir vous proposer des dates pour une réunion',
      bonneReponse: false
    }
  ]
};

const questionFin3 = {
  id: 'fin3',
  illustration: Fin,
  intitule: 'Avec qui Sophie a t-elle déjeuné ?',
  metacompetence: 'memorisation',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: 'Denis',
      bonneReponse: true
    },
    {
      id: '2',
      intitule: 'Richard',
      bonneReponse: false
    },
    {
      id: '3',
      intitule: 'Michel',
      bonneReponse: false
    },
    {
      id: '4',
      intitule: 'Alexis',
      bonneReponse: false
    },
    {
      id: '5',
      intitule: 'Mickael',
      bonneReponse: false
    }
  ]
};

const questionMessage1 = {
  id: 'quel-bureau',
  icone: iconeMessages,
  illustration: AppMessage1,
  intitule: 'À quel bureau Sophie devrait-elle se rendre tout à l’heure ?',
  metacompetence: 'numeratie',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: '51',
      bonneReponse: false
    },
    {
      id: '2',
      intitule: '61',
      bonneReponse: false
    },
    {
      id: '3',
      intitule: '71',
      bonneReponse: false
    },
    {
      id: '4',
      intitule: '81',
      bonneReponse: false
    },
    {
      id: '5',
      intitule: '91',
      bonneReponse: true
    }
  ]
};

const questionMessage2 = {
  id: 'quelle-salle-reserver',
  icone: iconeMessages,
  illustration: AppMessage2,
  intitule: 'Dans quelle salle de jeu Sophie a-t-elle décidé d’aller ?',
  metacompetence: 'numeratie',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: 'salle 1 : capacité 80 personnes, 50€',
      bonneReponse: true
    },
    {
      id: '2',
      intitule: 'salle 2 : capacité 90 personnes, 60€',
      bonneReponse: false
    },
    {
      id: '3',
      intitule: 'salle 3 : capacité 105 personnes, 100€',
      bonneReponse: false
    },
    {
      id: '4',
      intitule: 'salle 4 : capacité 125 personnes, 150€',
      bonneReponse: false
    },
    {
      id: '5',
      intitule: 'salle 5 : capacité 15 personnes, 10€',
      bonneReponse: false
    }
  ]
};

const questionMessage3 = {
  id: 'ou-retrouver-dounia',
  icone: iconeMessages,
  illustration: AppMessage3,
  intitule: 'Où Sophie devait-elle retrouver Dounia ?',
  metacompetence: 'ccf',
  type: 'qcm',
  choix: [
    {
      id: '1',
      image: restaurant,
      bonneReponse: false
    },
    {
      id: '2',
      image: entree,
      bonneReponse: true
    },
    {
      id: '3',
      image: toilettes,
      bonneReponse: false
    },
    {
      id: '4',
      image: zoo,
      bonneReponse: false
    },
    {
      id: '5',
      image: golf,
      bonneReponse: false
    }
  ]
};

const questionRepondeur1 = {
  id: 'heure-bureau-mickael',
  audioRepondeur: 'heure-bureau-mickael',
  icone: iconeRepondeur,
  illustration: AppRepondeur1,
  intitule: 'A quelle heure Sophie doit-elle se rendre dans le bureau de Mickael ?',
  modalite_reponse: 'Écoutez le message en cliquant sur le bouton lecture.',
  extensionVue: 'lecture-message',
  metacompetence: 'ccf',
  type: 'qcm',
  choix: [
    {
      id: '1',
      intitule: '12h45',
      bonneReponse: false
    },
    {
      id: '2',
      intitule: '12h15',
      bonneReponse: false
    },
    {
      id: '4',
      intitule: '16h45',
      bonneReponse: false
    },
    {
      id: '5',
      intitule: '16h35',
      bonneReponse: false
    },
    {
      id: '6',
      intitule: '16h15',
      bonneReponse: false
    },
    {
      id: '7',
      intitule: '13h45',
      bonneReponse: true
    },
    {
      id: '8',
      intitule: '13h35',
      bonneReponse: false
    }
  ]
};

const questionRepondeur2 = {
  id: 'nombre-tours-de-manege',
  type: 'champ-saisie',
  sous_type: 'numerique',
  espacerChiffres: false,
  audioRepondeur: 'nombre-tours-de-manege',
  icone: iconeRepondeur,
  illustration: AppRepondeur2,
  description: 'Vous savez que Sophie lance un tour de manège pour 7 enfants.',
  intitule: 'Que sophie devrait-elle répondre ?',
  extensionVue: 'lecture-message',
  reponse: {
    texte: '21'
  },
  metacompetence: 'numeratie'
};

const configurationEntrainement = {
  apps: {
    agenda: [questionAgendaEntrainement]
  },
  consignesEcranAccueil: ['Veuillez cliquer sur l’application Agenda pour l’ouvrir.']
};
const configurationNormale = {
  appsAccueilVerrouille: {
    deverrouillage: [questionDeverrouillage]
  },
  apps: {
    photos: [questionPhoto],
    repondeur: [questionRepondeur1, questionRepondeur2],
    notes: [questionNotes],
    agenda: [questionAgenda],
    messages: [questionMessage3, questionMessage1, questionMessage2]
  },
  consignesEcranAccueil: [
    'Pour commencer à explorer le téléphone vous devez le déverrouiller.</br>Cliquez sur le bouton “Déverrouiller”.',
    'Continuez à chercher Sophie en utilisant les indices que vous trouverez dans les différentes applications de son téléphone.'
  ],
  questionsFin: [questionFin1, questionFin2, questionFin3]
};

export { configurationEntrainement, configurationNormale };
