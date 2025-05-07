import listeTitresMusique from '../assets/liste_titres_musique.png';
import telephoneSansTitres from '../assets/telephone_sans_titres.png';
import terrasseCafe from '../assets/terrasse_cafe.png';
import magazineSansTexte from '../assets/magazine_sans_texte.png';
import listeDeCourse from '../assets/telephone_liste_de_courses.png';

const sousConsigneALrd1 = {
  id: 'ALrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: terrasseCafe,
  nom_technique: 'sous_consigne_ALrd_1',
  intitule: "Vous décidez d'écouter de la musique sur votre téléphone. Une amie vous a conseillé un groupe de jazz à découvrir."
};

const sousConsigneALrd2 = {
  id: 'ALrd-sous-consigne-2',
  type: 'sous-consigne',
  illustration: listeTitresMusique,
  nom_technique: 'sous_consigne_ALrd_2',
  intitule: "Voici la liste des titres. J'ai quelques questions pour vous.\n\nFaites-moi signe en cliquant sur « Suivant » lorsque vous voulez vous lancer !"
};

const sousConsigneACrd1 = {
  id: 'ACrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  template: 'article article--disque',
  nom_technique: 'sous_consigne_ACrd_1',
  intitule: 'Dans le magazine, il y a une présentation de ce disque. Je vais maintenant vous poser des questions sur ce texte. Prenez connaissance du texte.\n\nPour commencer à répondre aux questions, cliquez sur « Suivant ».'
};

const titre1 = {
  id: 'ALrd1',
  nom_technique: 'titre_1',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 1, quelle est la bonne lecture ?',
  modalite_reponse: 'Dès que vous aurez reconnu la bonne lecture, choisissez une des réponses ci-dessous. Pour confirmer votre réponse, cliquez sur « Valider ».',
  choix: [
    {
      id: 'bax',
      nom_technique: 'ALrd/bax',
      bonneReponse: false,
      retranscription_audio: "Bax"
    },
    {
      id: 'masse',
      nom_technique: 'ALrd/masse',
      bonneReponse: false,
      retranscription_audio: "Masse"
    },
    {
      id: 'max',
      nom_technique: 'ALrd/max',
      bonneReponse: true,
      retranscription_audio: "Max"
    }
  ]
};

const titre2 = {
  id: 'ALrd2',
  nom_technique: 'titre_2',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 2, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'jazzABimoudon',
      nom_technique: 'ALrd/jazz_a_bimoudon',
      bonneReponse: false,
      retranscription_audio: "Jazz à Bimoudon"
    },
    {
      id: 'jazzADimoudon',
      nom_technique: 'ALrd/jazz_a_dimoudon',
      bonneReponse: true,
      retranscription_audio: "Jazz à Dimoudon"
    },
    {
      id: 'jazzADiboudon',
      nom_technique: 'ALrd/jazz_a_diboudon',
      bonneReponse: false,
      retranscription_audio: "Jazz à Diboudon"
    }
  ]
};

const titre10 = {
  id: 'ALrd3',
  nom_technique: 'titre_10',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 10, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'unAmiEnAmont',
      nom_technique: 'ALrd/un_ami_en_amont',
      bonneReponse: false,
      retranscription_audio: "Un ami en amont"
    },
    {
      id: 'unAmiAmant',
      nom_technique: 'ALrd/un_ami_amant',
      bonneReponse: false,
      retranscription_audio: "Un ami amant"
    },
    {
      id: 'unAmiUnAmant',
      nom_technique: 'ALrd/un_ami_un_amant',
      bonneReponse: true,
      retranscription_audio: "Un ami un amant"
    }
  ]
};

const titre3 = {
  id: 'ALrd4',
  nom_technique: 'titre_3',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 3, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'balleEtTalle',
      nom_technique: 'ALrd/balle_et_talle',
      bonneReponse: false,
      retranscription_audio: "Balle et talle"
    },
    {
      id: 'pailleEtDaille',
      nom_technique: 'ALrd/paille_et_daille',
      bonneReponse: false,
      retranscription_audio: "Paille et daille"
    },
    {
      id: 'bailleEtTaille',
      nom_technique: 'ALrd/baille_et_taille',
      bonneReponse: true,
      retranscription_audio: "Baille et taille"
    }
  ]
};

const titre11 = {
  id: 'ALrd5',
  nom_technique: 'titre_11',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 11, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'dussoEtMatura',
      nom_technique: 'ALrd/dusso_et_matura',
      bonneReponse: false,
      retranscription_audio: "Dusso et matura"
    },
    {
      id: 'duxoEtMatura',
      nom_technique: 'ALrd/duxo_et_matura',
      bonneReponse: true,
      retranscription_audio: "Duxo et matura"
    },
    {
      id: 'duxoEtMadura',
      nom_technique: 'ALrd/duxo_et_madura',
      bonneReponse: false,
      retranscription_audio: "Duxo et madura"
    }
  ]
};

const titre6 = {
  id: 'ALrd6',
  nom_technique: 'titre_6',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 6, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'amourSugulent',
      nom_technique: 'ALrd/amour_sugulent',
      bonneReponse: false,
      retranscription_audio: "Amour sugulent"
    },
    {
      id: 'amourSucculent',
      nom_technique: 'ALrd/amour_succulent',
      bonneReponse: true,
      retranscription_audio: "Amour succulent"
    },
    {
      id: 'amourSuccule',
      nom_technique: 'ALrd/amour_succule',
      bonneReponse: false,
      retranscription_audio: "Amour succule"
    }
  ]
};

const titre8 = {
  id: 'ALrd7',
  nom_technique: 'titre_8',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 8, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'anguilEtDouceMer',
      nom_technique: 'ALrd/anguil_et_douce_mer',
      bonneReponse: false,
      retranscription_audio: "Anguil et douce mer"
    },
    {
      id: 'anquilleEtDouceMer',
      nom_technique: 'ALrd/anquille_et_douce_mer',
      bonneReponse: false,
      retranscription_audio: "Anquille et douce mer"
    },
    {
      id: 'anguilleEtDouceMer',
      nom_technique: 'ALrd/anguille_et_douce_mer',
      bonneReponse: true,
      retranscription_audio: "Anguille et douce mer"
    }
  ]
};

const titre5 = {
  id: 'ALrd8',
  nom_technique: 'titre_5',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 5, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'exerciceDeStyle',
      nom_technique: 'ALrd/exercice_de_style',
      bonneReponse: true,
      retranscription_audio: "Exercice de style"
    },
    {
      id: 'ezerciceDeStyle',
      nom_technique: 'ALrd/ezercice_de_style',
      bonneReponse: false,
      retranscription_audio: "Ezercice de style"
    },
    {
      id: 'esserciceDeStyle',
      nom_technique: 'ALrd/essercice_de_style',
      bonneReponse: false,
      retranscription_audio: "Essercice de style"
    }
  ]
};

const titre4 = {
  id: 'ALrd9',
  nom_technique: 'titre_4',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 4, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'leVilDuTemps',
      nom_technique: 'ALrd/le_vil_du_temps',
      bonneReponse: false,
      retranscription_audio: "Le vil du temps"
    },
    {
      id: 'leFilsDuTemps',
      nom_technique: 'ALrd/le_fils_du_temps',
      bonneReponse: false,
      retranscription_audio: "Le fils du temps"
    },
    {
      id: 'leFilDuTemps',
      nom_technique: 'ALrd/le_fil_du_temps',
      bonneReponse: true,
      retranscription_audio: "Le fil du temps"
    }
  ]
};

const titre7 = {
  id: 'ALrd10',
  nom_technique: 'titre_7',
  metacompetence: 'lecture',
  type: 'qcm',
  score: 1,
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 7, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'soupconDAmertume',
      nom_technique: 'ALrd/soupcon_d_amertume',
      bonneReponse: true,
      retranscription_audio: "Soupcon d'amertume"
    },
    {
      id: 'souponDAmertume',
      nom_technique: 'ALrd/soupon_d_amertume',
      bonneReponse: false,
      retranscription_audio: "Soupon d'amertume"
    },
    {
      id: 'soupconDAbertube',
      nom_technique: 'ALrd/soupcon_d_abertube',
      bonneReponse: false,
      retranscription_audio: "Soupcon d'abertube"
    }
  ]
};

const alrd11 = {
  id: 'ALrd11',
  nom_technique: 'alrd_11',
  metacompetence: 'lecture',
  illustration: telephoneSansTitres,
  modalite_reponse: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».\nPour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic-sur-mots',
  score: 1,
  template: 'liste-chansons',
  retranscription_audio: 'Sélectionnez le mot Exercice',
  reponse: {
    bonne_reponse: ['Exercice'],
    nom_technique: 'ALrd/exercice',
  }
};

const alrd12 = {
  id: 'ALrd12',
  nom_technique: 'alrd_12',
  metacompetence: 'lecture',
  illustration: telephoneSansTitres,
  extensionVue: 'clic-sur-mots',
  template: 'liste-chansons',
  score: 1,
  retranscription_audio: 'Sélectionnez le mot Anguille',
  reponse: {
    bonne_reponse: ['Anguille'],
    nom_technique: 'ALrd/anguille',
  }
};

const alrd13 = {
  id: 'ALrd13',
  nom_technique: 'alrd_13',
  metacompetence: 'lecture',
  illustration: telephoneSansTitres,
  extensionVue: 'clic-sur-mots',
  template: 'liste-chansons',
  score: 1,
  retranscription_audio: 'Sélectionnez le mot Dimoudon',
  reponse: {
    bonne_reponse: ['Dimoudon'],
    nom_technique: 'ALrd/dimoudon',
  }
};

const alrd14 = {
  id: 'ALrd14',
  nom_technique: 'alrd_14',
  metacompetence: 'lecture',
  illustration: telephoneSansTitres,
  extensionVue: 'clic-sur-mots',
  template: 'liste-chansons',
  score: 1,
  retranscription_audio: 'Sélectionnez le mot Soupçons',
  reponse: {
    bonne_reponse: ['Soupçon'],
    nom_technique: 'ALrd/soupcon',
  }
};

const ACrd1 = {
  id: 'ACrd1',
  nom_technique: 'acrd_1',
  metacompetence: 'comprehension',
  intitule: 'Comment s’appelle le groupe ?',
  template: 'article article--disque',
  score: 1,
  illustration: magazineSansTexte,
  modalite_reponse: 'Pour répondre aux questions, cliquez sur la réponse directement dans le texte. Quand vous avez fait votre choix, cliquez sur « Valider ».',
  extensionVue: 'clic-sur-mots',
  reponse: {
    bonne_reponse: ['Rick Duxol & Mori Morino'],
  }
};

const ACrd2 = {
  id: 'ACrd2',
  nom_technique: 'acrd_2',
  metacompetence: 'comprehension',
  intitule: 'Comment s’appelle le joueur de contrebasse ?',
  template: 'article article--disque',
  score: 1,
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  reponse: {
    bonne_reponse: ['Georges Tiporanet'],
  }
};

const ACrd3 = {
  id: 'ACrd3',
  nom_technique: 'acrd_3',
  metacompetence: 'comprehension',
  intitule: 'Dans quelle ville a eu lieu l’enregistrement de ce disque ?',
  template: 'article article--disque',
  score: 1,
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  reponse: {
    bonne_reponse:['New-York'],
  }
};

const ACrd4 = {
  id: 'ACrd4',
  nom_technique: 'acrd_4',
  metacompetence: 'comprehension',
  intitule: 'De quel pays le groupe vient-il ?',
  template: 'article article--disque',
  score: 1,
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  reponse: {
    bonne_reponse: ['Bulgarie'],
  }
};

const ACrd5 = {
  id: 'ACrd5',
  nom_technique: 'acrd_5',
  metacompetence: 'comprehension',
  intitule: 'En quelle année le groupe a-t-il débuté ?',
  template: 'article article--disque',
  score: 1,
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  reponse: {
    bonne_reponse: ['2011'],
  }
};

const sousConsigneACrd2 = {
  id: 'ACrd-sous-consigne-2',
  nom_technique: 'sous_consigne_ACrd_2',
  type: 'sous-consigne',
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  template: 'article article--disque',
  intitule: 'Maintenant, pour répondre aux questions suivantes, cliquez sur le bouton correspondant à la réponse.\n\nPour commencer à répondre aux questions, cliquez sur « Suivant ».'
};

const ACrd6 = {
  id: 'ACrd6',
  nom_technique: 'acrd_6',
  metacompetence: 'comprehension',
  intitule: 'Qui est Ivano Karanadoff ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  template: 'article article--disque',
  score: 1,
  type: 'qcm',
  modalite_reponse: "Choisissez votre réponse en cliquant sur l'un des ronds ci-dessous. Quand vous avez fait votre choix, cliquez sur « Valider ».",
  choix: [
    {
      id: 'membreDuGroupe',
      nom_technique: 'ACrd/membre_du_groupe',
      bonneReponse: false,
      intitule: 'Un membre du groupe Rick Duxol et Mori Morino'
    },
    {
      id: 'producteur',
      nom_technique: 'ACrd/producteur',
      bonneReponse: false,
      intitule: 'Un producteur de disque'
    },
    {
      id: 'critiqueMusical',
      nom_technique: 'ACrd/critique_musical',
      bonneReponse: true,
      intitule: 'Un critique musical'
    }
  ]
};

const ACrd7 = {
  id: 'ACrd7',
  nom_technique: 'acrd_7',
  metacompetence: 'comprehension',
  intitule: 'Quel est le genre de musique que produit ce groupe ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  score: 1,
  template: 'article article--disque',
  type: 'qcm',
  choix: [
    {
      id: 'reggae',
      nom_technique: 'ACrd/reggae',
      bonneReponse: false,
      intitule: 'Reggae'
    },
    {
      id: 'jazz',
      nom_technique: 'ACrd/jazz',
      bonneReponse: true,
      intitule: 'Jazz'
    },
    {
      id: 'rockFrancais',
      nom_technique: 'ACrd/rock_francais',
      bonneReponse: false,
      intitule: 'Rock français'
    }
  ]
};
const ACrd8 = {
  id: 'ACrd8',
  nom_technique: 'acrd_8',
  metacompetence: 'comprehension',
  intitule: 'Qui a influencé ce groupe ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  template: 'article article--disque',
  score: 1,
  type: 'qcm',
  choix: [
    {
      id: 'ntm',
      nom_technique: 'ACrd/ntm',
      bonneReponse: false,
      intitule: 'NTM'
    },
    {
      id: 'jazzBandDeLondres',
      nom_technique: 'ACrd/jazz_band_de_londres',
      bonneReponse: true,
      intitule: 'Jazz band de Londres'
    },
    {
      id: 'rockerset',
      nom_technique: 'ACrd/rockerset',
      bonneReponse: false,
      intitule: 'Rockerset'
    }
  ]
};

const ACrd9 = {
  id: 'ACrd9',
  nom_technique: 'acrd_9',
  metacompetence: 'comprehension',
  intitule: 'Que pense la critique de ce style musical ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  score: 1,
  template: 'article article--disque',
  type: 'qcm',
  choix: [
    {
      id: 'inventif',
      nom_technique: 'ACrd/inventif',
      bonneReponse: false,
      intitule: 'Inventif'
    },
    {
      id: 'drole',
      nom_technique: 'ACrd/drole',
      bonneReponse: false,
      intitule: 'Drôle'
    },
    {
      id: 'neuf',
      nom_technique: 'ACrd/neuf',
      bonneReponse: true,
      intitule: 'Neuf'
    }
  ]
};

const ACrd10 = {
  id: 'ACrd10',
  nom_technique: 'acrd_10',
  metacompetence: 'comprehension',
  intitule: 'Ivano Karanadoff pense que les paroles des chansons évoquent :',
  illustration: magazineSansTexte,
  extensionVue: 'clic-sur-mots',
  template: 'article article--disque',
  score: 1,
  type: 'qcm',
  choix: [
    {
      id: 'tempsPresent',
      nom_technique: 'ACrd/le_temps_present',
      bonneReponse: false,
      intitule: 'Le temps présent'
    },
    {
      id: 'tempsFutur',
      nom_technique: 'ACrd/le_temps_futur',
      bonneReponse: true,
      intitule: 'Le temps futur'
    },
    {
      id: 'tempsPasse',
      nom_technique: 'ACrd/le_temps_passe',
      bonneReponse: false,
      intitule: 'Le temps passé'
    }
  ]
};

const listeChansons = `* [Max]()
* [Jazz]() à [Dimoudon]()
* [Baille]() et [taille]()
* Le [fil]() du [temps]()
* [Exercice]() de [style]()
* [Amour]() [succulent]()
* [Soupçon]() d'[amertume]()
* [Anguille]() et [douce]() [mer]()
* [Sourire]() [toujours]()
* Un [ami](), un [amant]()
* [Duxo]() et [matura]()
`;

const texteMagazineColonne1 = `<span>C'est encore une très belle [production]() que nous propose le groupe [Rick Duxol & Mori Morino]() avec [«Jazz impressions»](), leur dernier [album](), créé en [2013]() et enregistré à [New-York]().</span><span>Ils avaient déjà séduit la presse et le public à leurs débuts en [2011](), au moment du [Festival international de jazz de Londres](). Très influencés par le «[Jazz Band]() de [Londres]()», ils ont pourtant un style nouveau bien à eux, qui évoque l'avenir dans tous les morceaux.</span><span>Le saxophoniste américain [Rick Duxol]() nous enchante avec ses solos qui ne manquent pas de souffle&nbsp;! Quant au contrebassiste [Georges Tiporanet](), il est excellent sur cet album.</span>`;
const texteMagazineColonne2 = `<span>Les différents morceaux se font sur un ton énergique mais aussi très intime parfois. Le pianiste, [Mori Morino]() crée une ambiance [«cocon»](), dont la sensibilité nous rappelle les ambiances nocturnes de [«Taxi Konnera»](), un autre orchestre de [jazz]() célèbre.</span><span>Jusqu'à la fin, c'est en mesure et en finesse que l'orchestre met en valeur la voix étonnante de [Lily Molli](), jeune femme de [30]() ans, arrivée dans le groupe en [2012](), au moment où le groupe est devenu célèbre...</span><span>Le groupe [Rick Duxol & Mori Morino]() démontre de belle manière avec ce disque que cet orchestre venu de [Bulgarie]() n'a rien à envier au Jazz des [américains]().</span>`;
const legende = `<span class="legende">[Ivano Karanadoff]()<br>Critique d'art musical à [Paris]() Jazz [Janvier 2015]()</span>`;

const texteMagazine =
`
|||
|:---|:---|
|${texteMagazineColonne1}|${texteMagazineColonne2}${legende}|
`;

const sousConsigneAPlc1 = {
  id: 'APlc-sous-consigne-1',
  nom_technique: 'sous_consigne_APlc_1',
  type: 'sous-consigne',
  illustration: terrasseCafe,
  intitule: "Ce soir, vous recevez des amis. Vous avez décidé de cuisiner, même si vous n'en avez pas l'habitude. Il vous faut donc acheter du matériel de cuisine et des aliments à cuisiner. Pour cela, vous avez commencé votre liste de courses, mais vous devez la compléter."
};

const sousConsigneAPlc2 = {
  id: 'APlc-sous-consigne-2',
  nom_technique: 'sous_consigne_APlc_2',
  type: 'sous-consigne',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  intitule: "Voici la liste de courses à compléter. Je vais vous dire ce qu'il faut acheter. Pour répondre, écrivez les mots dans le cadre de texte.\n\nSoyez attentifs, certains mots doivent être mis au pluriel, et les verbes doivent être conjugués.\n\nSi vous ne savez pas comment écrire certains mots, écrivez-les comme vous le pensez et continuez.",
  modalite_reponse: 'Pour commencer, cliquez sur « Suivant ».'
};

const APlc1 = {
  id: 'APlc1',
  nom_technique: 'aplc_1',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  modalite_reponse: 'Pour répondre, écrivez les mots dans le cadre de texte.\n\nVous pouvez utiliser le bouton Lecture pour ré-écouter les mots. Pour confirmer votre réponse, cliquez sur « Valider ».',
  illustration: listeDeCourse,
  retranscription_audio: 'Pour commencer, donnez un nom à votre liste : « Courses pour la cuisine ». Écrivez « cuisine ».',
  reponses: [{
    nom_technique: 'APlc/cuisine',
    intitule: 'cuisine',
    type_choix: 'bon'
  },
  {
    nom_technique: 'APlc/cuisines',
    intitule: 'cuisines',
    type_choix: 'acceptable'
  }]
};

const APlc2 = {
  id: 'APlc2',
  nom_technique: 'aplc_2',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: 'Vous voulez faire une salade de légumes en entrée, il vous faut donc deux saladiers en verre. Ecrivez « saladiers »',
  reponses: [{
    nom_technique: 'APlc/saladier',
    intitule: 'saladier',
    type_choix: 'bon'
  },
  {
    nom_technique: 'APlc/saladiers',
    intitule: 'saladiers',
    type_choix: 'bonus'
  }]
};

const APlc3 = {
  id: 'APlc3',
  nom_technique: 'aplc_3',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: 'Ecrivez « verre »',
  reponses: [
    {
      nom_technique: 'APlc/verre',
      intitule: 'verre',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/verres',
      intitule: 'verres',
      type_choix: 'acceptable'
    }
  ]
};

const APlc4 = {
  id: 'APlc4',
  nom_technique: 'aplc_4',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: '"Pour votre salade de légumes, il vous faudra un pot de mayonnaise. Ecrivez « mayonnaise »"',
  reponses: [
    {
      nom_technique: 'APlc/mayonnaise',
      intitule: 'mayonnaise',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/mayonnaises',
      intitule: 'mayonnaises',
      type_choix: 'acceptable'
    }
  ]
};

const APlc5 = {
  id: 'APlc5',
  nom_technique: 'aplc_5',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: 'Vous devez également acheter du sel. Ecrivez « sel »',
  reponses: [
    {
      nom_technique: 'APlc/sel',
      intitule: 'sel',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/sels',
      intitule: 'sels',
      type_choix: 'acceptable'
    }
  ]
};

const APlc6 = {
  id: 'APlc6',
  nom_technique: 'aplc_6',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: 'Pour les légumes, vous aurez besoin de deux kilos de tomate de pays et de quatre poivrons. Ecrivez « tomates »',
  reponses: [
    {
      nom_technique: 'APlc/tomate',
      intitule: 'tomate',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/tomates',
      intitule: 'tomates',
      type_choix: 'bonus'
    }
  ]
};

const APlc7 = {
  id: 'APlc7',
  nom_technique: 'aplc_7',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: 'Ecrivez « pays »',
  reponses: [
    {
      nom_technique: 'APlc/pays',
      intitule: 'pays',
      type_choix: 'bon'
    }
  ]
};

const APlc8 = {
  id: 'APlc8',
  nom_technique: 'aplc_8',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: 'Ecrivez « poivrons »',
  reponses: [
    {
      nom_technique: 'APlc/poivron',
      intitule: 'poivron',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/poivrons',
      intitule: 'poivrons',
      type_choix: 'bonus'
    }
  ]
};

const APlc9 = {
  id: 'APlc9',
  nom_technique: 'aplc_9',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: 'Enfin, vous utiliserez des épices qui donnent du goût. Ecrivez « épices »',
  reponses: [
    {
      nom_technique: 'APlc/epice1',
      intitule: 'épice',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/epice2',
      intitule: 'epice',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/epices3',
      intitule: 'èpice',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/epice4',
      intitule: 'êpice',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/epices5',
      intitule: 'ëpice',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/epices',
      intitule: 'épices',
      type_choix: 'bonus'
    },
    {
      nom_technique: 'APlc/epices',
      intitule: 'epices',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/epices',
      intitule: 'èpices',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/epices',
      intitule: 'êpices',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/epices',
      intitule: 'ëpices',
      type_choix: 'bon'
    }
  ]
};

const APlc10 = {
  id: 'APlc10',
  nom_technique: 'aplc_10',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: 'Ecrivez « donnent »',
  reponses: [
    {
      nom_technique: 'APlc/donne',
      intitule: 'donne',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/donnent',
      intitule: 'donnent',
      type_choix: 'bonus'
    }
  ]
};

const APlc11 = {
  id: 'APlc11',
  nom_technique: 'aplc_11',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Ce n'est pas tout, vous devez acheter un peu de matériel de cuisine. Vous souhaitez acheter de belles assiettes. Il vous en faudrait deux douzaines. Ecrivez « douzaines »",
  reponses: [
    {
      nom_technique: 'APlc/douzaine',
      intitule: 'douzaine',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/douzaines',
      intitule: 'douzaines',
      type_choix: 'bonus'
    }
  ]
};

const APlc12 = {
  id: 'APlc12',
  nom_technique: 'aplc_12',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Ecrivez « assiettes »",
  reponses: [
    {
      nom_technique: 'APlc/assiette',
      intitule: 'assiette',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/assiettes',
      intitule: 'assiettes',
      type_choix: 'bonus'
    }
  ]
};

const APlc13 = {
  id: 'APlc13',
  nom_technique: 'aplc_13',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  score_bonus: 1.25,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Pour cuisiner, vous aurez besoin de deux fouets, d'une louche et d'une passoire. Ecrivez « fouets »",
  reponses: [
    {
      nom_technique: 'APlc/fouet',
      intitule: 'fouet',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/fouets',
      intitule: 'fouets',
      type_choix: 'bonus'
    }
  ]
};

const APlc14 = {
  id: 'APlc14',
  nom_technique: 'aplc_14',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Ecrivez « louche »",
  reponses: [
    {
      nom_technique: 'APlc/louche',
      intitule: 'louche',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/louches',
      intitule: 'louches',
      type_choix: 'acceptable'
    }
  ]
};

const APlc15 = {
  id: 'APlc15',
  nom_technique: 'aplc_15',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Ecrivez « passoire »",
  reponses: [
    {
      nom_technique: 'APlc/passoire',
      intitule: 'passoire',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/passoires',
      intitule: 'passoires',
      type_choix: 'acceptable'
    }
  ]
};

const APlc16 = {
  id: 'APlc16',
  nom_technique: 'aplc_16',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Il vous faudra une poêle de luxe et une casserole qui n’adhère pas. Ecrivez « poêle »",
  reponses: [
    {
      nom_technique: 'APlc/poele',
      intitule: 'poêle',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/poele2',
      intitule: 'poele',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/poele3',
      intitule: 'poéle',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/poele4',
      intitule: 'poèle',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/poele5',
      intitule: 'poële',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/poeles1',
      intitule: 'poêles',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/poeles2',
      intitule: 'poeles',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/poeles3',
      intitule: 'poéles',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/poeles4',
      intitule: 'poèles',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/poeles5',
      intitule: 'poëles',
      type_choix: 'acceptable'
    }
  ]
};

const APlc17 = {
  id: 'APlc17',
  nom_technique: 'aplc_17',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Ecrivez « luxe »",
  reponses: [
    {
      nom_technique: 'APlc/luxe',
      intitule: 'luxe',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/luxes',
      intitule: 'luxes',
      type_choix: 'acceptable'
    }
  ]
};

const APlc18 = {
  id: 'APlc18',
  nom_technique: 'aplc_18',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Ecrivez « casserole »",
  reponses: [
    {
      nom_technique: 'APlc/casserole',
      intitule: 'casserole',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/casseroles',
      intitule: 'casseroles',
      type_choix: 'acceptable'
    }
  ]
};

const APlc19 = {
  id: 'APlc19',
  nom_technique: 'aplc_19',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Ecrivez « adhère »",
  reponses: [
    {
      nom_technique: 'APlc/adhere',
      intitule: 'adhère',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/adhere2',
      intitule: 'adhere',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/adhere3',
      intitule: 'adhére',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/adhere4',
      intitule: 'adhêre',
      type_choix: 'acceptable'
    },
    {
      nom_technique: 'APlc/adhere5',
      intitule: 'adhëre',
      type_choix: 'acceptable'
    }
  ]
};

const APlc20 = {
  id: 'APlc20',
  nom_technique: 'aplc_20',
  metacompetence: 'production',
  type: 'saisie',
  score: 1,
  score_acceptable: 0.75,
  sous_type: 'texte',
  extensionVue: 'liste-courses-a-trous',
  illustration: listeDeCourse,
  retranscription_audio: "Enfin, pour respecter les règles d'hygiène, il vous faudra une solution alcoolique pour nettoyer votre plan de travail. Ecrivez « alcoolique »",
  reponses: [
    {
      nom_technique: 'APlc/alcoolique',
      intitule: 'alcoolique',
      type_choix: 'bon'
    },
    {
      nom_technique: 'APlc/alcooliques',
      intitule: 'alcooliques',
      type_choix: 'acceptable'
    }
  ]
};

const parcoursBas = {
  series: [
    { cartes: [ sousConsigneALrd1, sousConsigneALrd2 ] },
    {
      texte: listeChansons,
      cartes: [ titre1, titre2, titre10, titre3, titre11, titre6, titre8, titre5, titre4, titre7, alrd11, alrd12, alrd13, alrd14 ]
    },
    {
      texte: texteMagazine,
      texteNonCliquable: true,
      cartes: [ sousConsigneACrd1 ]
    },
    {
      texte: texteMagazine,
      cartes: [ ACrd1, ACrd2, ACrd3, ACrd4, ACrd5 ]
    },
    {
      texte: texteMagazine,
      texteNonCliquable: true,
      cartes: [ sousConsigneACrd2 ]
    },
    {
      texte: texteMagazine,
      texteNonCliquable: true,
      cartes: [ ACrd6, ACrd7, ACrd8, ACrd9, ACrd10 ]
    },
    { cartes: [ sousConsigneAPlc1, sousConsigneAPlc2 ] },
    { cartes: [ APlc1, APlc2, APlc3, APlc4, APlc5, APlc6, APlc7, APlc8, APlc9, APlc10, APlc11, APlc12, APlc13, APlc14, APlc15, APlc16, APlc17, APlc18, APlc19, APlc20 ] }
  ]
};

export { parcoursBas };
