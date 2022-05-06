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
  intitule: "Voici la liste des titres. J'ai quelques questions pour vous.",
  modalite_reponse:  'Faites-moi signe en cliquant sur « Suivant » lorsque vous voulez vous lancer !'
};

const sousConsigneACrd1 = {
  id: 'ACrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'revue-magazine',
  nom_technique: 'sous_consigne_ACrd_1',
  intitule: 'Dans le magazine, il y a une présentation de ce disque. Je vais maintenant vous poser des questions sur ce texte. Prenez connaissance du texte.',
  modalite_reponse: 'Pour commencer à répondre aux questions, cliquez sur « Suivant ».'
};

const titre1 = {
  id: 'ALrd1',
  nom_technique: 'titre_1',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 1, quelle est la bonne lecture ?',
  modalite_reponse: 'Dès que vous aurez reconnu la bonne lecture, choisissez une des réponses ci-dessous. Pour confirmer votre réponse, cliquez sur « Valider ».',
  choix: [
    {
      id: 'bax',
      nom_technique: 'bax',
      bonneReponse: false
    },
    {
      id: 'masse',
      nom_technique: 'masse',
      bonneReponse: false
    },
    {
      id: 'max',
      nom_technique: 'max',
      bonneReponse: true
    }
  ]
};

const titre2 = {
  id: 'ALrd2',
  nom_technique: 'titre_2',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 2, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'jazzABimoudon',
      nom_technique: 'jazz_a_bimoudon',
      bonneReponse: false
    },
    {
      id: 'jazzADimoudon',
      nom_technique: 'jazz_a_dimoudon',
      bonneReponse: true
    },
    {
      id: 'jazzADiboudon',
      nom_technique: 'jazz_a_diboudon',
      bonneReponse: false
    }
  ]
};

const titre10 = {
  id: 'ALrd3',
  nom_technique: 'titre_10',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 10, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'unAmiEnAmont',
      nom_technique: 'un_ami_en_amont',
      bonneReponse: false
    },
    {
      id: 'unAmiAmant',
      nom_technique: 'un_ami_amant',
      bonneReponse: false
    },
    {
      id: 'unAmiUnAmant',
      nom_technique: 'un_ami_un_amant',
      bonneReponse: true
    }
  ]
};

const titre3 = {
  id: 'ALrd4',
  nom_technique: 'titre_3',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 3, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'balleEtTalle',
      nom_technique: 'balle_et_talle',
      bonneReponse: false
    },
    {
      id: 'pailleEtDaille',
      nom_technique: 'paille_et_daille',
      bonneReponse: false
    },
    {
      id: 'bailleEtTaille',
      nom_technique: 'baille_et_taille',
      bonneReponse: true
    }
  ]
};

const titre11 = {
  id: 'ALrd5',
  nom_technique: 'titre_11',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 11, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'dussoEtMatura',
      nom_technique: 'dusso_et_matura',
      bonneReponse: false
    },
    {
      id: 'duxoEtMatura',
      nom_technique: 'duxo_et_matura',
      bonneReponse: true
    },
    {
      id: 'duxoEtMadura',
      nom_technique: 'duxo_et_madura',
      bonneReponse: false
    }
  ]
};

const titre6 = {
  id: 'ALrd6',
  nom_technique: 'titre_6',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 6, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'amourSugulent',
      nom_technique: 'amour_sugulent',
      bonneReponse: false
    },
    {
      id: 'amourSucculent',
      nom_technique: 'amour_succulent',
      bonneReponse: true
    },
    {
      id: 'amourSuccule',
      nom_technique: 'amour_succule',
      bonneReponse: false
    }
  ]
};

const titre8 = {
  id: 'ALrd7',
  nom_technique: 'titre_8',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 8, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'anguilEtDouceMer',
      nom_technique: 'anguil_et_douce_mer',
      bonneReponse: false
    },
    {
      id: 'anquilleEtDouceMer',
      nom_technique: 'anquille_et_douce_mer',
      bonneReponse: false
    },
    {
      id: 'anguilleEtDouceMer',
      nom_technique: 'anguille_et_douce_mer',
      bonneReponse: true
    }
  ]
};

const titre5 = {
  id: 'ALrd8',
  nom_technique: 'titre_5',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 5, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'exerciceDeStyle',
      nom_technique: 'exercice_de_style',
      bonneReponse: true
    },
    {
      id: 'ezerciceDeStyle',
      nom_technique: 'ezercice_de_style',
      bonneReponse: false
    },
    {
      id: 'esserciceDeStyle',
      nom_technique: 'essercice_de_style',
      bonneReponse: false
    }
  ]
};

const titre4 = {
  id: 'ALrd9',
  nom_technique: 'titre_4',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 4, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'leVilDuTemps',
      nom_technique: 'le_vil_du_temps',
      bonneReponse: false
    },
    {
      id: 'leFilsDuTemps',
      nom_technique: 'le_fils_du_temps',
      bonneReponse: false
    },
    {
      id: 'leFilDuTemps',
      nom_technique: 'le_fil_du_temps',
      bonneReponse: true
    }
  ]
};

const titre7 = {
  id: 'ALrd10',
  nom_technique: 'titre_7',
  type: 'qcm',
  illustration: listeTitresMusique,
  intitule: 'Pour le titre 7, quelle est la bonne lecture ?',
  choix: [
    {
      id: 'soupconDAmertume',
      nom_technique: 'soupcon_d_amertume',
      bonneReponse: true
    },
    {
      id: 'souponDAmertume',
      nom_technique: 'soupon_d_amertume',
      bonneReponse: false
    },
    {
      id: 'soupconDAbertube',
      nom_technique: 'soupcon_d_abertube',
      bonneReponse: false
    }
  ]
};

const alrd11 = {
  id: 'ALrd11',
  nom_technique: 'alrd_11',
  illustration: telephoneSansTitres,
  modalite_reponse: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  reponse: {
    texte: 'Exercice',
    nom_technique: 'exercice'
  }
};

const alrd12 = {
  id: 'ALrd12',
  nom_technique: 'alrd_12',
  illustration: telephoneSansTitres,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  reponse: {
    texte: 'Anguille',
    nom_technique: 'anguille'
  }
};

const alrd13 = {
  id: 'ALrd13',
  nom_technique: 'alrd_13',
  illustration: telephoneSansTitres,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  reponse: {
    texte: 'Dimoudon',
    nom_technique: 'dimoudon'
  }
};

const alrd14 = {
  id: 'ALrd14',
  nom_technique: 'alrd_14',
  illustration: telephoneSansTitres,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  reponse: {
    texte: 'Soupçon',
    nom_technique: 'soupcon'
  }
};

const ACrd1 = {
  id: 'ACrd1',
  nom_technique: 'acrd_1',
  intitule: 'Comment s’appelle le groupe ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  modalite_reponse: 'Pour répondre aux questions, cliquez sur la réponse directement dans le texte. Quand vous avez fait votre choix, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: 'Rick Duxol & Mori Morino'
  }
};

const ACrd2 = {
  id: 'ACrd2',
  nom_technique: 'acrd_2',
  intitule: 'Comment s’appelle le joueur de contrebasse ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: 'Georges Tiporanet'
  }
};

const ACrd3 = {
  id: 'ACrd3',
  nom_technique: 'acrd_3',
  intitule: 'Dans quelle ville a eu lieu l’enregistrement de ce disque ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: 'New-York'
  }
};

const ACrd4 = {
  id: 'ACrd4',
  nom_technique: 'acrd_4',
  intitule: 'De quel pays le groupe vient-il ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: 'Bulgarie'
  }
};

const ACrd5 = {
  id: 'ACrd5',
  nom_technique: 'acrd_5',
  intitule: 'En quelle année le groupe a-t-il débuté ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  reponse: {
    texte: '2011'
  }
};

const sousConsigneACrd2 = {
  id: 'ACrd-sous-consigne-2',
  type: 'sous-consigne',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'revue-magazine',
  nom_technique: 'sous_consigne_ACrd_2',
  intitule: 'Maintenant, pour répondre aux questions suivantes, cliquez sur le bouton correspondant à la réponse.',
  modalite_reponse: 'Pour commencer à répondre aux questions, cliquez sur « Suivant ».'
};

const ACrd6 = {
  id: 'ACrd6',
  nom_technique: 'acrd_6',
  intitule: 'Qui est Ivano Karanadoff ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'revue-magazine',
  type: 'qcm',
  modalite_reponse: "Choisissez votre réponse en cliquant sur l'un des ronds ci-dessous. Quand vous avez fait votre choix, cliquez sur « Valider ».",
  choix: [
    {
      id: 'membreDuGroupe',
      nom_technique: 'membre_du_groupe',
      bonneReponse: false,
      intitule: 'Un membre du groupe Rick Duxol et Mori Morino'
    },
    {
      id: 'producteur',
      nom_technique: 'producteur',
      bonneReponse: false,
      intitule: 'Un producteur de disque'
    },
    {
      id: 'critiqueMusical',
      nom_technique: 'critique_musical',
      bonneReponse: true,
      intitule: 'Un critique musical'
    }
  ]
};

const ACrd7 = {
  id: 'ACrd7',
  nom_technique: 'acrd_7',
  intitule: 'Quel est le genre de musique que produit ce groupe ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'revue-magazine',
  type: 'qcm',
  choix: [
    {
      id: 'reggae',
      nom_technique: 'reggae',
      bonneReponse: false,
      intitule: 'Reggae'
    },
    {
      id: 'jazz',
      nom_technique: 'jazz',
      bonneReponse: true,
      intitule: 'Jazz'
    },
    {
      id: 'rockFrancais',
      nom_technique: 'rock_francais',
      bonneReponse: false,
      intitule: 'Rock français'
    }
  ]
};
const ACrd8 = {
  id: 'ACrd8',
  nom_technique: 'acrd_8',
  intitule: 'Qui a influencé ce groupe ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'revue-magazine',
  type: 'qcm',
  choix: [
    {
      id: 'ntm',
      nom_technique: 'ntm',
      bonneReponse: false,
      intitule: 'NTM'
    },
    {
      id: 'jazzBandDeLondres',
      nom_technique: 'jazz_band_de_londres',
      bonneReponse: true,
      intitule: 'Jazz band de Londres'
    },
    {
      id: 'rockerset',
      nom_technique: 'rockerset',
      bonneReponse: false,
      intitule: 'Rockerset'
    }
  ]
};

const ACrd9 = {
  id: 'ACrd9',
  nom_technique: 'acrd_9',
  intitule: 'Que pense la critique de ce style musical ?',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'revue-magazine',
  type: 'qcm',
  choix: [
    {
      id: 'inventif',
      nom_technique: 'inventif',
      bonneReponse: false,
      intitule: 'Inventif'
    },
    {
      id: 'drole',
      nom_technique: 'drole',
      bonneReponse: false,
      intitule: 'Drôle'
    },
    {
      id: 'neuf',
      nom_technique: 'neuf',
      bonneReponse: true,
      intitule: 'Neuf'
    }
  ]
};

const ACrd10 = {
  id: 'ACrd10',
  nom_technique: 'acrd_10',
  intitule: 'Ivano Karanadoff pense que les paroles des chansons évoquent :',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'revue-magazine',
  type: 'qcm',
  choix: [
    {
      id: 'tempsPresent',
      nom_technique: 'temps_present',
      bonneReponse: false,
      intitule: 'Le temps présent'
    },
    {
      id: 'tempsFutur',
      nom_technique: 'temps_futur',
      bonneReponse: true,
      intitule: 'Le temps futur'
    },
    {
      id: 'tempsPasse',
      nom_technique: 'temps_passe',
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

const texteMagazineNonCliquable = texteMagazine.replaceAll('[','').replaceAll(']()', '');

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
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  intitule: "Voici la liste de courses à compléter. Je vais vous dire ce qu'il faut acheter. Pour répondre, écrivez les mots dans le cadre de texte.<br><br>Si vous ne savez pas comment écrire certains mots, écrivez-les comme vous le pensez et continuez.",
  modalite_reponse: 'Pour commencer, cliquez sur « Suivant ».'
};

const APlc1 = {
  id: 'APlc1',
  nom_technique: 'aplc_1',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  modalite_reponse: 'Pour répondre, écrivez les mots dans le cadre de texte.<br><br>Vous pouvez utiliser le bouton Lecture pour ré-écouter les mots. Pour confirmer votre réponse, cliquez sur « Valider ».',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'cuisine',
    texte: 'cuisine'
  }
};

const APlc2 = {
  id: 'APlc2',
  nom_technique: 'aplc_2',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'saladiers',
    texte: 'saladiers'
  }
};

const APlc3 = {
  id: 'APlc3',
  nom_technique: 'aplc_3',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'verre',
    texte: 'verre'
  }
};

const APlc4 = {
  id: 'APlc4',
  nom_technique: 'aplc_4',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'mayonnaise',
    texte: 'mayonnaise'
  }
};

const APlc5 = {
  id: 'APlc5',
  nom_technique: 'aplc_5',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'sel',
    texte: 'sel'
  }
};

const APlc6 = {
  id: 'APlc6',
  nom_technique: 'aplc_6',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'tomates',
    texte: 'tomates'
  }
};

const APlc7 = {
  id: 'APlc7',
  nom_technique: 'aplc_7',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'pays',
    texte: 'pays'
  }
};

const APlc8 = {
  id: 'APlc8',
  nom_technique: 'aplc_8',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'poivrons',
    texte: 'poivrons'
  }
};

const APlc9 = {
  id: 'APlc9',
  nom_technique: 'aplc_9',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'epices',
    texte: 'épices'
  }
};

const APlc10 = {
  id: 'APlc10',
  nom_technique: 'aplc_10',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'donnent',
    texte: 'donnent'
  }
};

const APlc11 = {
  id: 'APlc11',
  nom_technique: 'aplc_11',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'douzaines',
    texte: 'douzaines'
  }
};

const APlc12 = {
  id: 'APlc12',
  nom_technique: 'aplc_12',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'assiettes',
    texte: 'assiettes'
  }
};

const APlc13 = {
  id: 'APlc13',
  nom_technique: 'aplc_13',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'fouets',
    texte: 'fouets'
  }
};

const APlc14 = {
  id: 'APlc14',
  nom_technique: 'aplc_14',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'louche',
    texte: 'louche'
  }
};

const APlc15 = {
  id: 'APlc15',
  nom_technique: 'aplc_15',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'passoire',
    texte: 'passoire'
  }
};

const APlc16 = {
  id: 'APlc16',
  nom_technique: 'aplc_16',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'poele',
    texte: 'poêle'
  }
};

const APlc17 = {
  id: 'APlc17',
  nom_technique: 'aplc_17',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'luxe',
    texte: 'luxe'
  }
};

const APlc18 = {
  id: 'APlc18',
  nom_technique: 'aplc_18',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'casserole',
    texte: 'casserole'
  }
};

const APlc19 = {
  id: 'APlc19',
  nom_technique: 'aplc_19',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'adhere',
    texte: 'adhère'
  }
};

const APlc20 = {
  id: 'APlc20',
  nom_technique: 'aplc_20',
  type: 'champ-saisie',
  sous_type: 'texte',
  extensionVue: 'texte_a_trous',
  illustration: listeDeCourse,
  placeholder: 'Réponse',
  reponse: {
    nom_technique: 'alcoolique',
    texte: 'alcoolique'
  }
};

const configurationNormale = {
  series: [
    { cartes: [ sousConsigneALrd1, sousConsigneALrd2 ] },
    {
      texteCliquable: listeChansons,
      cartes: [ titre1, titre2, titre10, titre3, titre11, titre6, titre8, titre5, titre4, titre7, alrd11, alrd12, alrd13, alrd14 ]
    },
    {
      texteCliquable: texteMagazineNonCliquable,
      cartes: [ sousConsigneACrd1 ]
    },
    {
      texteCliquable: texteMagazine,
      cartes: [ ACrd1, ACrd2, ACrd3, ACrd4, ACrd5 ]
    },
    {
      texteCliquable: texteMagazineNonCliquable,
      cartes: [ sousConsigneACrd2 ]
    },
    {
      texteCliquable: texteMagazineNonCliquable,
      cartes: [ ACrd6, ACrd7, ACrd8, ACrd9, ACrd10 ]
    },
    { cartes: [ sousConsigneAPlc1, sousConsigneAPlc2 ] },
    { cartes: [ APlc1, APlc2, APlc3, APlc4, APlc5, APlc6, APlc7, APlc8, APlc9, APlc10, APlc11, APlc12, APlc13, APlc14, APlc15, APlc16, APlc17, APlc18, APlc19, APlc20 ] }
  ]
};

export { configurationNormale };
