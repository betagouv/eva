import listeTitresMusique from '../assets/liste_titres_musique.png';
import telephoneSansTitres from '../assets/telephone_sans_titres.png';
import terrasseCafe from '../assets/terrasse_cafe.png';
import magazine from '../assets/magazine.png';
import magazineSansTexte from '../assets/magazine_sans_texte.png';
import listeDeCourse from '../assets/telephone_liste_de_courses.png';

const sousConsigneALrd1 = {
  id: 'ALrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: terrasseCafe,
  nom_technique: 'sous_consigne_ALrd_1',
  description: "Vous décidez d'écouter de la musique sur votre téléphone. Une amie vous a conseillé un groupe de jazz à découvrir."
};

const sousConsigneALrd2 = {
  id: 'ALrd-sous-consigne-2',
  type: 'sous-consigne',
  illustration: listeTitresMusique,
  nom_technique: 'sous_consigne_ALrd_2',
  description: "Voici la liste des titres. J'ai quelques questions pour vous.",
  intitule:  'Faites-moi signe en cliquant sur « Suivant » lorsque vous voulez vous lancer !'
};

const sousConsigneACrd1 = {
  id: 'ACrd-sous-consigne-1',
  type: 'sous-consigne',
  illustration: magazine,
  nom_technique: 'sous_consigne_ACrd_1',
  description: 'Dans le magazine, il y a une présentation de ce disque. Je vais maintenant vous poser des questions sur ce texte. Prenez connaissance du texte.',
  intitule: 'Pour commencer à répondre aux questions, cliquez sur « Suivant ».'
};

const titre1 = {
  id: 'ALrd1',
  nom_technique: 'titre_1',
  type: 'qcm',
  illustration: listeTitresMusique,
  description: 'Pour le titre 1, quelle est la bonne lecture ?',
  intitule: 'Dès que vous aurez reconnu la bonne lecture, choisissez une des réponses ci-dessous. Pour confirmer votre réponse, cliquez sur « Valider ».',
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
  description: 'Pour le titre 2, quelle est la bonne lecture ?',
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
  description: 'Pour le titre 10, quelle est la bonne lecture ?',
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
  description: 'Pour le titre 3, quelle est la bonne lecture ?',
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
  description: 'Pour le titre 11, quelle est la bonne lecture ?',
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
  description: 'Pour le titre 6, quelle est la bonne lecture ?',
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
  description: 'Pour le titre 8, quelle est la bonne lecture ?',
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
  description: 'Pour le titre 5, quelle est la bonne lecture ?',
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
  description: 'Pour le titre 4, quelle est la bonne lecture ?',
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
  description: 'Pour le titre 7, quelle est la bonne lecture ?',
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
  type: 'ecoute',
  illustration: telephoneSansTitres,
  intitule: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  bonne_reponse: {
    mot: 'Exercice',
    nom_technique: 'exercice'
  }
};

const alrd12 = {
  id: 'ALrd12',
  nom_technique: 'alrd_12',
  type: 'ecoute',
  illustration: telephoneSansTitres,
  intitule: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  bonne_reponse: {
    mot: 'Anguille',
    nom_technique: 'anguille'
  }
};

const alrd13 = {
  id: 'ALrd13',
  nom_technique: 'alrd_13',
  type: 'ecoute',
  illustration: telephoneSansTitres,
  intitule: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  bonne_reponse: {
    mot: 'Dimoudon',
    nom_technique: 'dimoudon'
  }
};

const alrd14 = {
  id: 'ALrd14',
  nom_technique: 'alrd_14',
  type: 'ecoute',
  illustration: telephoneSansTitres,
  intitule: 'Écoutez ou réécoutez le mot en cliquant sur le bouton « Lecture ».<br>Pour répondre, cliquez directement sur le mot. Pour confirmer, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  zone_cliquable: 'liste-chansons',
  bonne_reponse: {
    mot: 'Soupçon',
    nom_technique: 'soupcon'
  }
};

const ACrd1 = {
  id: 'ACrd1',
  nom_technique: 'acrd_1',
  description: 'Comment s’appelle le groupe ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  intitule: 'Pour répondre aux questions, cliquez sur la réponse directement dans le texte. Quand vous avez fait votre choix, cliquez sur « Valider ».',
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: 'Rick Duxol & Mori Morino'
  }
};

const ACrd2 = {
  id: 'ACrd2',
  nom_technique: 'acrd_2',
  description: 'Comment s’appelle le joueur de contrebasse ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: 'Georges Tiporanet'
  }
};

const ACrd3 = {
  id: 'ACrd3',
  nom_technique: 'acrd_3',
  description: 'Dans quelle ville a eu lieu l’enregistrement de ce disque ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: 'New-York'
  }
};

const ACrd4 = {
  id: 'ACrd4',
  nom_technique: 'acrd_4',
  description: 'De quel pays le groupe vient-il ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: 'Bulgarie'
  }
};

const ACrd5 = {
  id: 'ACrd5',
  nom_technique: 'acrd_5',
  description: 'En quelle année le groupe a-t-il débuté ?',
  zone_cliquable: 'revue-magazine',
  illustration: magazineSansTexte,
  extensionVue: 'clic_sur_mots',
  bonne_reponse: {
    mot: '2011'
  }
};

const sousConsigneACrd2 = {
  id: 'ACrd-sous-consigne-2',
  type: 'sous-consigne',
  illustration: magazine,
  nom_technique: 'sous_consigne_ACrd_2',
  description: 'Maintenant, pour répondre aux questions suivantes, cliquez sur le bouton correspondant à la réponse.',
  intitule: 'Pour commencer à répondre aux questions, cliquez sur « Suivant ».'
};

const ACrd6 = {
  id: 'ACrd6',
  nom_technique: 'acrd_6',
  description: 'Qui est Ivano Karanadoff ?',
  illustration: magazine,
  type: 'qcm',
  intitule: "Choisissez votre réponse en cliquant sur l'un des ronds ci-dessous. Quand vous avez fait votre choix, cliquez sur « Valider ».",
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
  description: 'Quel est le genre de musique que produit ce groupe ?',
  illustration: magazine,
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
  description: 'Qui a influencé ce groupe ?',
  illustration: magazine,
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
  description: 'Que pense la critique de ce style musical ?',
  illustration: magazine,
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
  description: 'Ivano Karanadoff pense que les paroles des chansons évoquent :',
  illustration: magazine,
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

const texteMagazineColonne1 = `<span>C'est encore une très belle [production]() que nous propose le groupe [Rick Duxol & Mori Morino]() avec [«Jazz impressions»](), leur dernier [album](), créé en [2013]() et enregistré à [New-York]().</span><span>Ils avaient déjà séduit la presse et le public à leurs débuts en [2011](), au moment du[Festival international de jazz de Londres](). Très influencés par le «[Jazz Band]() de [Londres]()», ils ont pourtant un style nouveau bien à eux, qui évoque l'avenir dans tous les morceaux.</span><span>Le saxophoniste américain [Rick Duxol]() nous enchante avec ses solos qui ne manquent pas de souffle&nbsp;! Quant au contrebassiste [Georges Tiporanet](), il est excellent sur cet album.</span>`;
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
  description: "Ce soir, vous recevez des amis. Vous avez décidé de cuisiner, même si vous n'en avez pas l'habitude. Il vous faut donc acheter du matériel de cuisine et des aliments à cuisiner. Pour cela, vous avez commencé votre liste de courses, mais vous devez la compléter."
};

const APlc1 = {
  id: 'APlc1',
  nom_technique: 'aplc_1',
  type: 'ecoute-et-saisi',
  description: 'Pour répondre, écrivez le mot que vous avez entendu dans le cadre de texte ci-dessous.',
  illustration: listeDeCourse,
  intitule: 'Vous pouvez utiliser le bouton Lecture pour ré-écouter les mots. Pour confirmer votre réponse, cliquez sur valider.'
};

const configurationNormale = {
  series: [
    { cartes: [ sousConsigneALrd1, sousConsigneALrd2 ] },
    {
      texteCliquable: listeChansons,
      cartes: [ titre1, titre2, titre10, titre3, titre11, titre6, titre8, titre5, titre4, titre7, alrd11, alrd12, alrd13, alrd14 ]
    },
    { cartes: [ sousConsigneACrd1 ] },
    {
      texteCliquable: texteMagazine,
      cartes: [ ACrd1, ACrd2, ACrd3, ACrd4, ACrd5 ]
    },
    { cartes: [ sousConsigneACrd2 ] },
    { cartes: [ ACrd6, ACrd7, ACrd8, ACrd9, ACrd10 ] },
    { cartes: [ sousConsigneAPlc1 ] },
    { cartes: [ APlc1 ] }
  ]
};

export { configurationNormale };
