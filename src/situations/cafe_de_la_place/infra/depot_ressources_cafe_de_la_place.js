import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'cafe_de_la_place/assets/audio_consignes/consigne_cafe_de_la_place.mp3';
import fondSituation from 'cafe_de_la_place/assets/terrasse_cafe.png';

import sousConsigne1 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_1.mp3';
import sousConsigne2 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_2.mp3';

import titre1 from 'cafe_de_la_place/assets/audio_questions/titre1.mp3';
import titre2 from 'cafe_de_la_place/assets/audio_questions/titre2.mp3';
import titre10 from 'cafe_de_la_place/assets/audio_questions/titre10.mp3';
import titre3 from 'cafe_de_la_place/assets/audio_questions/titre3.mp3';
import titre11 from 'cafe_de_la_place/assets/audio_questions/titre11.mp3';
import titre6 from 'cafe_de_la_place/assets/audio_questions/titre6.mp3';
import titre8 from 'cafe_de_la_place/assets/audio_questions/titre8.mp3';
import titre5 from 'cafe_de_la_place/assets/audio_questions/titre5.mp3';
import titre4 from 'cafe_de_la_place/assets/audio_questions/titre4.mp3';
import titre7 from 'cafe_de_la_place/assets/audio_questions/titre7.mp3';
import clicSurMot from 'cafe_de_la_place/assets/audio_questions/clic_sur_mot.mp3';

import sonChoixBax from 'cafe_de_la_place/assets/audio_reponses/bax.mp3';
import sonChoixMasse from 'cafe_de_la_place/assets/audio_reponses/masse.mp3';
import sonChoixMax from 'cafe_de_la_place/assets/audio_reponses/max.mp3';
import sonChoixJazzDiboudon from 'cafe_de_la_place/assets/audio_reponses/jazz_a_diboudon.mp3';
import sonChoixJazzBimoudon from 'cafe_de_la_place/assets/audio_reponses/jazz_a_bimoudon.mp3';
import sonChoixJazzDimoudon from 'cafe_de_la_place/assets/audio_reponses/jazz_a_dimoudon.mp3';
import sonChoixUnAmiEnAmont from 'cafe_de_la_place/assets/audio_reponses/un_ami_en_amont.mp3';
import sonChoixUnAmiAmant from 'cafe_de_la_place/assets/audio_reponses/un_ami_amant.mp3';
import sonChoixUnAmiUnAmant from 'cafe_de_la_place/assets/audio_reponses/un_ami_un_amant.mp3';
import sonChoixBalleEtTalle from 'cafe_de_la_place/assets/audio_reponses/balle_et_talle.mp3';
import sonChoixPailleEtDaille from 'cafe_de_la_place/assets/audio_reponses/paille_et_daille.mp3';
import sonChoixBailleEtTaille from 'cafe_de_la_place/assets/audio_reponses/baille_et_taille.mp3';
import sonChoixDussoEtMatura from 'cafe_de_la_place/assets/audio_reponses/dusso_et_matura.mp3';
import sonChoixDuxoEtMatura from 'cafe_de_la_place/assets/audio_reponses/duxo_et_matura.mp3';
import sonChoixDuxoEtMadura from 'cafe_de_la_place/assets/audio_reponses/duxo_et_madura.mp3';
import sonChoixAmourSugulent from 'cafe_de_la_place/assets/audio_reponses/amour_sugulent.mp3';
import sonChoixAmourSucculent from 'cafe_de_la_place/assets/audio_reponses/amour_succulent.mp3';
import sonChoixAmourSuccule from 'cafe_de_la_place/assets/audio_reponses/amour_succule.mp3';
import sonChoixAnguilEtDouceMer from 'cafe_de_la_place/assets/audio_reponses/anguil_et_douce_mer.mp3';
import sonChoixAnquilleEtDouceMer from 'cafe_de_la_place/assets/audio_reponses/anquille_et_douce_mer.mp3';
import sonChoixAnguilleEtDouceMer from 'cafe_de_la_place/assets/audio_reponses/anguille_et_douce_mer.mp3';
import sonChoixExerciceDeStyle from 'cafe_de_la_place/assets/audio_reponses/exercice_de_style.mp3';
import sonChoixEzerciceDeStyle from 'cafe_de_la_place/assets/audio_reponses/ezercice_de_style.mp3';
import sonChoixEsserciceDeStyle from 'cafe_de_la_place/assets/audio_reponses/essercice_de_style.mp3';
import sonChoixLeVilDuTemps from 'cafe_de_la_place/assets/audio_reponses/le_vil_du_temps.mp3';
import sonChoixLeFilsDuTemps from 'cafe_de_la_place/assets/audio_reponses/le_fils_du_temps.mp3';
import sonChoixLeFilDuTemps from 'cafe_de_la_place/assets/audio_reponses/le_fil_du_temps.mp3';
import sonChoixSoupconDAmertume from 'cafe_de_la_place/assets/audio_reponses/soupcon_d_amertume.mp3';
import sonChoixSouponDAmertume from 'cafe_de_la_place/assets/audio_reponses/soupon_d_amertume.mp3';
import sonChoixSoupconDAbertube from 'cafe_de_la_place/assets/audio_reponses/soupcon_d_abertube.mp3';
import sonExercice from 'cafe_de_la_place/assets/audio_reponses/exercice.mp3';
import sonAnguille from 'cafe_de_la_place/assets/audio_reponses/anguille.mp3';
import sonDimoudon from 'cafe_de_la_place/assets/audio_reponses/dimoudon.mp3';
import sonSoupcon from 'cafe_de_la_place/assets/audio_reponses/soupcon.mp3';

const AUDIOS_CONSIGNES = {
  sous_consigne_1: sousConsigne1,
  sous_consigne_2: sousConsigne2
};

const AUDIOS_QUESTIONS = {
  titre_1: titre1,
  titre_2: titre2,
  titre_10: titre10,
  titre_3: titre3,
  titre_11: titre11,
  titre_6: titre6,
  titre_8: titre8,
  titre_5: titre5,
  titre_4: titre4,
  titre_7: titre7,
  alrd_11: clicSurMot,
  alrd_12: clicSurMot,
  alrd_13: clicSurMot,
  alrd_14: clicSurMot
};

const AUDIOS_REPONSES = {
  bax: sonChoixBax,
  masse: sonChoixMasse,
  max: sonChoixMax,
  jazz_a_diboudon: sonChoixJazzDiboudon,
  jazz_a_bimoudon: sonChoixJazzBimoudon,
  jazz_a_dimoudon: sonChoixJazzDimoudon,
  un_ami_en_amont: sonChoixUnAmiEnAmont,
  un_ami_amant: sonChoixUnAmiAmant,
  un_ami_un_amant: sonChoixUnAmiUnAmant,
  balle_et_talle: sonChoixBalleEtTalle,
  paille_et_daille: sonChoixPailleEtDaille,
  baille_et_taille: sonChoixBailleEtTaille,
  dusso_et_matura: sonChoixDussoEtMatura,
  duxo_et_matura: sonChoixDuxoEtMatura,
  duxo_et_madura: sonChoixDuxoEtMadura,
  amour_sugulent: sonChoixAmourSugulent,
  amour_succulent: sonChoixAmourSucculent,
  amour_succule: sonChoixAmourSuccule,
  anguil_et_douce_mer: sonChoixAnguilEtDouceMer,
  anquille_et_douce_mer: sonChoixAnquilleEtDouceMer,
  anguille_et_douce_mer: sonChoixAnguilleEtDouceMer,
  exercice_de_style: sonChoixExerciceDeStyle,
  ezercice_de_style: sonChoixEzerciceDeStyle,
  essercice_de_style: sonChoixEsserciceDeStyle,
  le_vil_du_temps: sonChoixLeVilDuTemps,
  le_fils_du_temps: sonChoixLeFilsDuTemps,
  le_fil_du_temps: sonChoixLeFilDuTemps,
  soupcon_d_amertume: sonChoixSoupconDAmertume,
  soupon_d_amertume: sonChoixSouponDAmertume,
  soupcon_d_abertube: sonChoixSoupconDAbertube,
  exercice: sonExercice,
  anguille: sonAnguille,
  dimoudon: sonDimoudon,
  soupcon: sonSoupcon,
};

const messagesAudios = { ...AUDIOS_CONSIGNES, ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesCafeDeLaPlace extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesAudios, fondSituation, sonConsigne);
    this.charge([fondSituation]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }
}
