import programmeTele from '../assets/programme_tele.png';
import programmeTeleZoom from '../assets/programme_tele_zoom.png';
import programmeTeleCirque from '../assets/programme_tele_cirque.png';
import programmeTele18h55 from '../assets/programme_tele_18h55.png';

const sousConsigneLOdi1 = {
  id: 'LOdi-sous-consigne-1',
  type: 'sous-consigne',
  illustration: programmeTele,
  nom_technique: 'sous_consigne_LOdi_1',
  intitule: "Vous prenez le magazine qui se trouve sur la table devant vous. Regardez attentivement cette page. Je vais vous poser quelques questions.<br><br>Faites-moi signe en cliquant sur « Suivant » lorsque vous voulez vous lancer !"
};

const sousConsigneLOdi2 = {
  id: 'LOdi-sous-consigne-2',
  type: 'sous-consigne',
  illustration: programmeTeleZoom,
  nom_technique: 'sous_consigne_LOdi_2',
  intitule: "Regardons plus en détail le film de 20 h 45.<br><br>Prenez le temps de lire ce texte, je vous poserai ensuite quelques questions. Rassurez-vous, le texte restera à l'écran et vous pourrez toujours le consulter quand je vous poserai des questions.<br><br>Pour commencer, cliquez sur « Suivant »"
};

const LOdi1 = {
  id: 'LOdi1',
  nom_technique: 'lodi_1',
  type: 'qcm',
  illustration: programmeTele,
  intitule: 'De quoi s’agit-il ?',
  modalite_reponse: 'Choisissez une des réponses ci-dessous. Pour écouter ou réécouter les questions ou les réponses, cliquez sur le bouton « Lecture » ( <svg width="16" height="16" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" fill="#6e84fe" r="10"/><path d="M14 8.701c1 .577 1 2.02 0 2.598l-5.813 3.356a1.5 1.5 0 0 1-2.25-1.3v-6.71a1.5 1.5 0 0 1 2.25-1.3z" fill="#fff"/></svg> ) à gauche de la phrase que vous souhaitez entendre. Pour confirmer votre réponse, cliquez sur « Valider ».',
  choix: [
    {
      id: 'couverture',
      nom_technique: 'couverture',
      bonneReponse: false
    },
    {
      id: 'programmeTele',
      nom_technique: 'programme_tele',
      bonneReponse: true
    },
    {
      id: 'motsCroises',
      nom_technique: 'mots_croises',
      bonneReponse: false
    }
  ]
};

const LOdi2 = {
  id: 'LOdi2',
  nom_technique: 'lodi_2',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: programmeTeleCirque,
  intitule: "Il s'agit d'un programme télé ! Il y a un film à 20 h 45. Quel est son titre ?",
  choix: [
    {
      id: 'cirqueEtClown',
      nom_technique: 'cirque_et_clown',
      bonneReponse: false
    },
    {
      id: 'cercleDicotino',
      nom_technique: 'cercle_dicotino',
      bonneReponse: false
    },
    {
      id: 'cirqueTino',
      nom_technique: 'cirque_tino',
      bonneReponse: false
    },
    {
      id: 'cirqueDicotino',
      nom_technique: 'cirque_dicotino',
      score: 1,
      bonneReponse: true
    }
  ]
};

const LOdi3 = {
  id: 'LOdi3',
  nom_technique: 'lodi_3',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTele18h55,
  intitule: "18 h 55<br>« Les livres ont la parole ». Quel est le sujet de l’émission ?",
  choix: [
    {
      id: 'mode_chapeau',
      nom_technique: 'mode_chapeau',
      bonneReponse: false
    },
    {
      id: 'livre',
      nom_technique: 'livre',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'confection_chapeau',
      nom_technique: 'confection_chapeau',
      bonneReponse: false
    }
  ]
};

const LOdi4 = {
  id: 'LOdi4',
  nom_technique: 'lodi_4',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: programmeTele18h55,
  intitule: "Donc, c’est une émission sur les livres. Quel est le nom du livre dont on parle ?",
  choix: [
    {
      id: 'chatMadameCoupin',
      nom_technique: 'chat_madame_coupin',
      bonneReponse: false
    },
    {
      id: 'chapeauMadameCoupin',
      nom_technique: 'chapeau_madame_coupin',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'chapeauMadameCoutin',
      nom_technique: 'chapeau_madame_coutin',
      bonneReponse: false
    },
    {
      id: 'chapeauMadameGoubin ',
      nom_technique: 'chapeau_madame_goubin',
      bonneReponse: false
    }
  ]
};

const LOdi5 = {
  id: 'LOdi5',
  nom_technique: 'lodi_5',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: programmeTele18h55,
  intitule: "Comment s’appelle le premier invité de cette émission ?",
  choix: [
    {
      id: 'dinoDepianto',
      nom_technique: 'dino_depianto',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'dinoDepanto',
      nom_technique: 'dino_depanto',
      bonneReponse: false
    },
    {
      id: 'binoBepanto',
      nom_technique: 'bino_bepanto',
      bonneReponse: false
    },
    {
      id: 'binoBepianto',
      nom_technique: 'bino_bepianto',
      bonneReponse: false
    }
  ]
};

const LOdi6 = {
  id: 'LOdi6',
  nom_technique: 'lodi_6',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTeleZoom,
  intitule: "Dans quelle ville a été créé le cirque ?",
  choix: [
    {
      id: 'belgique',
      nom_technique: 'belgique',
      bonneReponse: false
    },
    {
      id: 'brousse',
      nom_technique: 'brousse',
      bonneReponse: false
    },
    {
      id: 'bruges',
      nom_technique: 'bruges',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'bresse',
      nom_technique: 'bresse',
      bonneReponse: false
    }
  ]
};

const LOdi7 = {
  id: 'LOdi7',
  nom_technique: 'lodi_7',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTeleZoom,
  intitule: "Quel âge a la personne accidentée ?",
  choix: [
    {
      id: '17ans',
      nom_technique: 'dix_sept_ans',
      bonneReponse: false
    },
    {
      id: '24ans',
      nom_technique: 'vingt_quatre_ans',
      score: 1,
      bonneReponse: true
    },
    {
      id: '18ans',
      nom_technique: 'dix_huit_ans',
      bonneReponse: false
    }
  ]
};

const LOdi8 = {
  id: 'LOdi8',
  nom_technique: 'lodi_8',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTeleZoom,
  intitule: "Charles est-il plus âgé ou plus jeune que Bruno ?",
  choix: [
    {
      id: 'plusAge',
      nom_technique: 'plus_age',
      bonneReponse: false
    },
    {
      id: 'plusJeune',
      nom_technique: 'plus_jeune',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'memeAge',
      nom_technique: 'meme_age',
      bonneReponse: false
    }
  ]
};

const LOdi9 = {
  id: 'LOdi9',
  nom_technique: 'lodi_9',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTeleZoom,
  intitule: "D’après l’avis du programme télé, s’agit-il d’un film dramatique ou d’un film drôle ?",
  choix: [
    {
      id: 'dramatique',
      nom_technique: 'dramatique',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'drole',
      nom_technique: 'drole',
      bonneReponse: false
    }
  ]
};

const LOdi10 = {
  id: 'LOdi10',
  nom_technique: 'lodi_10',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTeleZoom,
  intitule: "Ce film est-il poétique, choquant ou érotique ?",
  choix: [
    {
      id: 'poetique',
      nom_technique: 'poetique',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'choquant',
      nom_technique: 'choquant',
      bonneReponse: false
    },
    {
      id: 'erotique',
      nom_technique: 'erotique',
      bonneReponse: false
    }
  ]
};

const LOdi11 = {
  id: 'LOdi11',
  nom_technique: 'lodi_11',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTeleZoom,
  intitule: "À votre avis, l’image représente-t-elle Charles au début du film ou à la fin du film ?",
  choix: [
    {
      id: 'debutFilm',
      nom_technique: 'debut_film',
      bonneReponse: false,
      intitule: 'Au début du film'
    },
    {
      id: 'finFilm',
      nom_technique: 'fin_film',
      score: 1,
      bonneReponse: true,
      intitule: 'À la fin du film'
    }
  ]
};

const LOdi12 = {
  id: 'LOdi12',
  nom_technique: 'lodi_12',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTeleZoom,
  intitule: "Pourquoi Charles est-il devenu clown dans le cirque ?",
  choix: [
    {
      id: 'sautPerilleux',
      nom_technique: 'saut_perilleux',
      score: 1,
      bonneReponse: true,
      intitule: 'Parce qu’il a été accidenté en faisant un saut périlleux'
    },
    {
      id: 'trapeze',
      nom_technique: 'trapeze',
      bonneReponse: false,
      intitule: 'Parce qu’il n’aime plus faire du trapèze'
    },
    {
      id: 'numerosDangereux',
      nom_technique: 'numeros_dangeureux',
      bonneReponse: false,
      intitule: 'Pour faire des numéros de plus en plus dangereux'
    }
  ]
};

const LOdi13 = {
  id: 'LOdi13',
  nom_technique: 'lodi_13',
  metacompetence: 'comprehention',
  type: 'qcm',
  illustration: programmeTeleZoom,
  intitule: "Lisez ces affirmations. Laquelle correspond à l’histoire du film ?",
  choix: [
    {
      id: 'trapezisteTombe',
      nom_technique: 'trapeziste_tombe',
      score: 1,
      bonneReponse: true,
      intitule: 'Un trapéziste tombe et se blesse'
    },
    {
      id: 'vide',
      nom_technique: 'vide',
      bonneReponse: false,
      intitule: 'Bruno a jeté Charles dans le vide'
    },
    {
      id: 'aventuresHandicape',
      nom_technique: 'aventures_handicape',
      bonneReponse: false,
      intitule: 'Les aventures d’un handicapé'
    }
  ]
};

const orientation = {
  series: [
    { cartes: [ sousConsigneLOdi1 ] },
    { cartes: [ LOdi1, LOdi2, LOdi3, LOdi4, LOdi5 ] },
    { cartes: [ sousConsigneLOdi2 ] },
    { cartes: [ LOdi6, LOdi7, LOdi8, LOdi9, LOdi10, LOdi11, LOdi12, LOdi13 ] },
  ]
};

export { orientation };
