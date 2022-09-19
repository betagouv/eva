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
  intitule: "Voici la liste des titres. J'ai quelques questions pour vous.<br><br>Faites-moi signe en cliquant sur « Suivant » lorsque vous voulez vous lancer !"
};

const sousConsigneACrd1 = {
  id: 'ACrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'article article--disque',
  nom_technique: 'sous_consigne_ACrd_1',
  intitule: 'Dans le magazine, il y a une présentation de ce disque. Je vais maintenant vous poser des questions sur ce texte. Prenez connaissance du texte.<br><br>Pour commencer à répondre aux questions, cliquez sur « Suivant ».'
};

const titre1 = {
  id: 'ALrd1',
  nom_technique: 'titre_1',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 1, quelle est la bonne lecture ?',
  modalite_reponse: 'Dès que vous aurez reconnu la bonne lecture, choisissez une des réponses ci-dessous. Pour confirmer votre réponse, cliquez sur « Valider ».',
  choix: [
    {
      id: 'bax',
      nom_technique: 'ALrd/bax',
      bonneReponse: false
    },
    {
      id: 'masse',
      nom_technique: 'ALrd/masse',
      bonneReponse: false
    },
    {
      id: 'max',
      nom_technique: 'ALrd/max',
      score: 1,
      bonneReponse: true
    }
  ]
};

const titre2 = {
  id: 'ALrd2',
  nom_technique: 'titre_2',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 2, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'jazzABimoudon',
      nom_technique: 'ALrd/jazz_a_bimoudon',
      bonneReponse: false
    },
    {
      id: 'jazzADimoudon',
      nom_technique: 'ALrd/jazz_a_dimoudon',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'jazzADiboudon',
      nom_technique: 'ALrd/jazz_a_diboudon',
      bonneReponse: false
    }
  ]
};

const titre10 = {
  id: 'ALrd3',
  nom_technique: 'titre_10',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 10, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'unAmiEnAmont',
      nom_technique: 'ALrd/un_ami_en_amont',
      bonneReponse: false
    },
    {
      id: 'unAmiAmant',
      nom_technique: 'ALrd/un_ami_amant',
      bonneReponse: false
    },
    {
      id: 'unAmiUnAmant',
      nom_technique: 'ALrd/un_ami_un_amant',
      score: 1,
      bonneReponse: true
    }
  ]
};

const titre3 = {
  id: 'ALrd4',
  nom_technique: 'titre_3',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 3, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'balleEtTalle',
      nom_technique: 'ALrd/balle_et_talle',
      bonneReponse: false
    },
    {
      id: 'pailleEtDaille',
      nom_technique: 'ALrd/paille_et_daille',
      bonneReponse: false
    },
    {
      id: 'bailleEtTaille',
      nom_technique: 'ALrd/baille_et_taille',
      score: 1,
      bonneReponse: true
    }
  ]
};

const titre11 = {
  id: 'ALrd5',
  nom_technique: 'titre_11',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 11, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'dussoEtMatura',
      nom_technique: 'ALrd/dusso_et_matura',
      bonneReponse: false
    },
    {
      id: 'duxoEtMatura',
      nom_technique: 'ALrd/duxo_et_matura',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'duxoEtMadura',
      nom_technique: 'ALrd/duxo_et_madura',
      bonneReponse: false
    }
  ]
};

const titre6 = {
  id: 'ALrd6',
  nom_technique: 'titre_6',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 6, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'amourSugulent',
      nom_technique: 'ALrd/amour_sugulent',
      bonneReponse: false
    },
    {
      id: 'amourSucculent',
      nom_technique: 'ALrd/amour_succulent',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'amourSuccule',
      nom_technique: 'ALrd/amour_succule',
      bonneReponse: false
    }
  ]
};

const titre8 = {
  id: 'ALrd7',
  nom_technique: 'titre_8',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 8, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'anguilEtDouceMer',
      nom_technique: 'ALrd/anguil_et_douce_mer',
      bonneReponse: false
    },
    {
      id: 'anquilleEtDouceMer',
      nom_technique: 'ALrd/anquille_et_douce_mer',
      bonneReponse: false
    },
    {
      id: 'anguilleEtDouceMer',
      nom_technique: 'ALrd/anguille_et_douce_mer',
      score: 1,
      bonneReponse: true
    }
  ]
};

const titre5 = {
  id: 'ALrd8',
  nom_technique: 'titre_5',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 5, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'exerciceDeStyle',
      nom_technique: 'ALrd/exercice_de_style',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'ezerciceDeStyle',
      nom_technique: 'ALrd/ezercice_de_style',
      bonneReponse: false
    },
    {
      id: 'esserciceDeStyle',
      nom_technique: 'ALrd/essercice_de_style',
      bonneReponse: false
    }
  ]
};

const titre4 = {
  id: 'ALrd9',
  nom_technique: 'titre_4',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 4, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'leVilDuTemps',
      nom_technique: 'ALrd/le_vil_du_temps',
      bonneReponse: false
    },
    {
      id: 'leFilsDuTemps',
      nom_technique: 'ALrd/le_fils_du_temps',
      bonneReponse: false
    },
    {
      id: 'leFilDuTemps',
      nom_technique: 'ALrd/le_fil_du_temps',
      score: 1,
      bonneReponse: true
    }
  ]
};

const titre7 = {
  id: 'ALrd10',
  nom_technique: 'titre_7',
  metacompetence: 'lecture',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 7, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'soupconDAmertume',
      nom_technique: 'ALrd/soupcon_d_amertume',
      score: 1,
      bonneReponse: true
    },
    {
      id: 'souponDAmertume',
      nom_technique: 'ALrd/soupon_d_amertume',
      bonneReponse: false
    },
    {
      id: 'soupconDAbertube',
      nom_technique: 'ALrd/soupcon_d_abertube',
      bonneReponse: false
    }
  ]
};

const alrd11 = {
  id: 'ALrd11',
  nom_technique: 'alrd_11',
  metacompetence: 'lecture',
  illustration: telephoneSansTitres,
  modalite_reponse: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  reponse: {
    texte: 'Exercice',
    nom_technique: 'ALrd/exercice',
    score: 1
  }
};

const alrd12 = {
  id: 'ALrd12',
  nom_technique: 'alrd_12',
  metacompetence: 'lecture',
  illustration: telephoneSansTitres,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  reponse: {
    texte: 'Anguille',
    nom_technique: 'ALrd/anguille',
    score: 1
  }
};

const alrd13 = {
  id: 'ALrd13',
  nom_technique: 'alrd_13',
  metacompetence: 'lecture',
  illustration: telephoneSansTitres,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  reponse: {
    texte: 'Dimoudon',
    nom_technique: 'ALrd/dimoudon',
    score: 1
  }
};

const alrd14 = {
  id: 'ALrd14',
  nom_technique: 'alrd_14',
  metacompetence: 'lecture',
  illustration: telephoneSansTitres,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  reponse: {
    texte: 'Soupçon',
    nom_technique: 'ALrd/soupcon',
    score: 1
  }
};

const ACrd1 = {
  id: 'ACrd1',
  nom_technique: 'acrd_1',
  metacompetence: 'comprehension',
  intitule: 'Comment s’appelle le groupe ?',
  zone_cliquable: 'article article--disque',
  illustration: magazineSansTexte,
  modalite_reponse: 'Pour répondre aux questions, cliquez sur la réponse directement dans le texte. Quand vous avez fait votre choix, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: 'Rick Duxol & Mori Morino',
    score: 1
  }
};

const ACrd2 = {
  id: 'ACrd2',
  nom_technique: 'acrd_2',
  metacompetence: 'comprehension',
  intitule: 'Comment s’appelle le joueur de contrebasse ?',
  zone_cliquable: 'article article--disque',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: 'Georges Tiporanet',
    score: 1
  }
};

const ACrd3 = {
  id: 'ACrd3',
  nom_technique: 'acrd_3',
  metacompetence: 'comprehension',
  intitule: 'Dans quelle ville a eu lieu l’enregistrement de ce disque ?',
  zone_cliquable: 'article article--disque',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: 'New-York',
    score: 1
  }
};

const ACrd4 = {
  id: 'ACrd4',
  nom_technique: 'acrd_4',
  metacompetence: 'comprehension',
  intitule: 'De quel pays le groupe vient-il ?',
  zone_cliquable: 'article article--disque',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: 'Bulgarie',
    score: 1
  }
};

const ACrd5 = {
  id: 'ACrd5',
  nom_technique: 'acrd_5',
  metacompetence: 'comprehension',
  intitule: 'En quelle année le groupe a-t-il débuté ?',
  zone_cliquable: 'article article--disque',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: '2011',
    score: 1
  }
};

const sousConsigneACrd2 = {
  id: 'ACrd-sous-consigne-2',
  nom_technique: 'sous_consigne_ACrd_2',
  type: 'sous-consigne',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'article article--disque',
  intitule: 'Maintenant, pour répondre aux questions suivantes, cliquez sur le bouton correspondant à la réponse.<br><br>Pour commencer à répondre aux questions, cliquez sur « Suivant ».'
};

const ACrd6 = {
  id: 'ACrd6',
  nom_technique: 'acrd_6',
  metacompetence: 'comprehension',
  intitule: 'Qui est Ivano Karanadoff ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'article article--disque',
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
      score: 1,
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
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'article article--disque',
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
      score: 1,
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
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'article article--disque',
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
      score: 1,
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
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'article article--disque',
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
      score: 1,
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
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'article article--disque',
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
      score: 1,
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
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  intitule: "Voici la liste de courses à compléter. Je vais vous dire ce qu'il faut acheter. Pour répondre, écrivez les mots dans le cadre de texte.<br><br>Soyez attentifs, certains mots doivent être mis au pluriel, et les verbes doivent être conjugués.<br><br>Si vous ne savez pas comment écrire certains mots, écrivez-les comme vous le pensez et continuez.",
  modalite_reponse: 'Pour commencer, cliquez sur « Suivant ».'
};

const APlc1 = {
  id: 'APlc1',
  nom_technique: 'aplc_1',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  modalite_reponse: 'Pour répondre, écrivez les mots dans le cadre de texte.<br><br>Vous pouvez utiliser le bouton Lecture pour ré-écouter les mots. Pour confirmer votre réponse, cliquez sur « Valider ».',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/cuisine',
    textes: ['cuisine', 'cuisines'],
    scores: [1, 0.75]
  }
};

const APlc2 = {
  id: 'APlc2',
  nom_technique: 'aplc_2',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/saladiers',
    textes: ['saladier', 'saladiers'],
    scores: [1, 1.25]
  }
};

const APlc3 = {
  id: 'APlc3',
  nom_technique: 'aplc_3',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/verre',
    textes: ['verre', 'verres'],
    scores: [1, 0.75]
  }
};

const APlc4 = {
  id: 'APlc4',
  nom_technique: 'aplc_4',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/mayonnaise',
    textes: ['mayonnaise', 'mayonnaises'],
    scores: [1, 0.75]
  }
};

const APlc5 = {
  id: 'APlc5',
  nom_technique: 'aplc_5',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/sel',
    textes: ['sel', 'sels'],
    scores: [1, 0.75]
  }
};

const APlc6 = {
  id: 'APlc6',
  nom_technique: 'aplc_6',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/tomates',
    textes: ['tomate', 'tomates'],
    scores: [1, 1.25]
  }
};

const APlc7 = {
  id: 'APlc7',
  nom_technique: 'aplc_7',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/pays',
    textes: ['pays'],
    scores: [1]
  }
};

const APlc8 = {
  id: 'APlc8',
  nom_technique: 'aplc_8',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/poivrons',
    textes: ['poivron', 'poivrons'],
    scores: [1, 1.25]
  }
};

const APlc9 = {
  id: 'APlc9',
  nom_technique: 'aplc_9',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/epices',
    textes: ['épice', 'epice', 'èpice', 'êpice', 'ëpice',
      'épices', 'epices', 'èpices', 'êpices', 'ëpices'],
    scores: [1, 0.75, 0.75, 0.75, 0.75,
      1.25, 1, 1, 1, 1]
  }
};

const APlc10 = {
  id: 'APlc10',
  nom_technique: 'aplc_10',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/donnent',
    textes: ['donne', 'donnent'],
    scores: [1, 1.25]
  }
};

const APlc11 = {
  id: 'APlc11',
  nom_technique: 'aplc_11',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/douzaines',
    textes: ['douzaine', 'douzaines'],
    scores: [1, 1.25]
  }
};

const APlc12 = {
  id: 'APlc12',
  nom_technique: 'aplc_12',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/assiettes',
    textes: ['assiette', 'assiettes'],
    scores: [1, 1.25]
  }
};

const APlc13 = {
  id: 'APlc13',
  nom_technique: 'aplc_13',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/fouets',
    textes: ['fouet', 'fouets'],
    scores: [1, 1.25]
  }
};

const APlc14 = {
  id: 'APlc14',
  nom_technique: 'aplc_14',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/louche',
    textes: ['louche', 'louches'],
    scores: [1, 0.75]
  }
};

const APlc15 = {
  id: 'APlc15',
  nom_technique: 'aplc_15',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/passoire',
    textes: ['passoire', 'passoires'],
    scores: [1, 0.75]
  }
};

const APlc16 = {
  id: 'APlc16',
  nom_technique: 'aplc_16',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/poele',
    textes: ['poêle', 'poele', 'poéle', 'poèle', 'poële',
      'poêles', 'poeles', 'poéles', 'poèles', 'poëles'],
    scores: [1, 0.75, 0.75, 0.75, 0.75,
      0.75, 0.75, 0.75, 0.75, 0.75]
  }
};

const APlc17 = {
  id: 'APlc17',
  nom_technique: 'aplc_17',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/luxe',
    textes: ['luxe', 'luxes'],
    scores: [1, 0.75]
  }
};

const APlc18 = {
  id: 'APlc18',
  nom_technique: 'aplc_18',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/casserole',
    textes: ['casserole', 'casseroles'],
    scores: [1, 0.75]
  }
};

const APlc19 = {
  id: 'APlc19',
  nom_technique: 'aplc_19',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/adhere',
    textes: ['adhère', 'adhere', 'adhére', 'adhêre', 'adhëre'],
    scores: [1, 0.75, 0.75, 0.75, 0.75]
  }
};

const APlc20 = {
  id: 'APlc20',
  nom_technique: 'aplc_20',
  metacompetence: 'production',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'liste_courses_a_trous',
  illustration: listeDeCourse,
  reponse: {
    nom_technique: 'APlc/alcoolique',
    textes: ['alcoolique', 'alcooliques'],
    scores: [1, 0.75]
  }
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
