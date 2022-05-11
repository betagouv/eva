import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';
import sonConsigne from 'cafe_de_la_place/assets/audio_consignes/consigne_cafe_de_la_place.mp3';
import fondSituation from 'cafe_de_la_place/assets/terrasse_cafe.png';

// AUDIOS SOUS CONSIGNES
import sousConsigneALrd1 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_ALrd_1.mp3';
import sousConsigneALrd2 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_ALrd_2.mp3';
import sousConsigneACrd1 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_ACrd_1.mp3';
import sousConsigneACrd2 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_ACrd_2.mp3';
import sousConsigneAPlc1 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_APlc_1.mp3';
import sousConsigneAPlc2 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_APlc_2.mp3';
import sousConsigneLOdi1 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_LOdi_1.mp3';
import sousConsigneLOdi2 from 'cafe_de_la_place/assets/audio_consignes/sous_consigne_LOdi_2.mp3';

// AUDIOS QUESTIONS
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
import ACrd1 from 'cafe_de_la_place/assets/audio_questions/ACrd1.mp3';
import ACrd2 from 'cafe_de_la_place/assets/audio_questions/ACrd2.mp3';
import ACrd3 from 'cafe_de_la_place/assets/audio_questions/ACrd3.mp3';
import ACrd4 from 'cafe_de_la_place/assets/audio_questions/ACrd4.mp3';
import ACrd5 from 'cafe_de_la_place/assets/audio_questions/ACrd5.mp3';
import ACrd6 from 'cafe_de_la_place/assets/audio_questions/ACrd6.mp3';
import ACrd7 from 'cafe_de_la_place/assets/audio_questions/ACrd7.mp3';
import ACrd8 from 'cafe_de_la_place/assets/audio_questions/ACrd8.mp3';
import ACrd9 from 'cafe_de_la_place/assets/audio_questions/ACrd9.mp3';
import ACrd10 from 'cafe_de_la_place/assets/audio_questions/ACrd10.mp3';
import questionAPlc from 'cafe_de_la_place/assets/audio_questions/APlc.mp3';
import LOdi1 from 'cafe_de_la_place/assets/audio_questions/LOdi1.mp3';
import LOdi2 from 'cafe_de_la_place/assets/audio_questions/LOdi2.mp3';
import LOdi3 from 'cafe_de_la_place/assets/audio_questions/LOdi3.mp3';
import LOdi4 from 'cafe_de_la_place/assets/audio_questions/LOdi4.mp3';
import LOdi5 from 'cafe_de_la_place/assets/audio_questions/LOdi5.mp3';
import LOdi6 from 'cafe_de_la_place/assets/audio_questions/LOdi6.mp3';
import LOdi7 from 'cafe_de_la_place/assets/audio_questions/LOdi7.mp3';
import LOdi8 from 'cafe_de_la_place/assets/audio_questions/LOdi8.mp3';
import LOdi9 from 'cafe_de_la_place/assets/audio_questions/LOdi9.mp3';
import LOdi10 from 'cafe_de_la_place/assets/audio_questions/LOdi10.mp3';

// AUDIOS REPONSES
import sonChoixBax from 'cafe_de_la_place/assets/audio_reponses/ALrd/bax.mp3';
import sonChoixMasse from 'cafe_de_la_place/assets/audio_reponses/ALrd/masse.mp3';
import sonChoixMax from 'cafe_de_la_place/assets/audio_reponses/ALrd/max.mp3';
import sonChoixJazzDiboudon from 'cafe_de_la_place/assets/audio_reponses/ALrd/jazz_a_diboudon.mp3';
import sonChoixJazzBimoudon from 'cafe_de_la_place/assets/audio_reponses/ALrd/jazz_a_bimoudon.mp3';
import sonChoixJazzDimoudon from 'cafe_de_la_place/assets/audio_reponses/ALrd/jazz_a_dimoudon.mp3';
import sonChoixUnAmiEnAmont from 'cafe_de_la_place/assets/audio_reponses/ALrd/un_ami_en_amont.mp3';
import sonChoixUnAmiAmant from 'cafe_de_la_place/assets/audio_reponses/ALrd/un_ami_amant.mp3';
import sonChoixUnAmiUnAmant from 'cafe_de_la_place/assets/audio_reponses/ALrd/un_ami_un_amant.mp3';
import sonChoixBalleEtTalle from 'cafe_de_la_place/assets/audio_reponses/ALrd/balle_et_talle.mp3';
import sonChoixPailleEtDaille from 'cafe_de_la_place/assets/audio_reponses/ALrd/paille_et_daille.mp3';
import sonChoixBailleEtTaille from 'cafe_de_la_place/assets/audio_reponses/ALrd/baille_et_taille.mp3';
import sonChoixDussoEtMatura from 'cafe_de_la_place/assets/audio_reponses/ALrd/dusso_et_matura.mp3';
import sonChoixDuxoEtMatura from 'cafe_de_la_place/assets/audio_reponses/ALrd/duxo_et_matura.mp3';
import sonChoixDuxoEtMadura from 'cafe_de_la_place/assets/audio_reponses/ALrd/duxo_et_madura.mp3';
import sonChoixAmourSugulent from 'cafe_de_la_place/assets/audio_reponses/ALrd/amour_sugulent.mp3';
import sonChoixAmourSucculent from 'cafe_de_la_place/assets/audio_reponses/ALrd/amour_succulent.mp3';
import sonChoixAmourSuccule from 'cafe_de_la_place/assets/audio_reponses/ALrd/amour_succule.mp3';
import sonChoixAnguilEtDouceMer from 'cafe_de_la_place/assets/audio_reponses/ALrd/anguil_et_douce_mer.mp3';
import sonChoixAnquilleEtDouceMer from 'cafe_de_la_place/assets/audio_reponses/ALrd/anquille_et_douce_mer.mp3';
import sonChoixAnguilleEtDouceMer from 'cafe_de_la_place/assets/audio_reponses/ALrd/anguille_et_douce_mer.mp3';
import sonChoixExerciceDeStyle from 'cafe_de_la_place/assets/audio_reponses/ALrd/exercice_de_style.mp3';
import sonChoixEzerciceDeStyle from 'cafe_de_la_place/assets/audio_reponses/ALrd/ezercice_de_style.mp3';
import sonChoixEsserciceDeStyle from 'cafe_de_la_place/assets/audio_reponses/ALrd/essercice_de_style.mp3';
import sonChoixLeVilDuTemps from 'cafe_de_la_place/assets/audio_reponses/ALrd/le_vil_du_temps.mp3';
import sonChoixLeFilsDuTemps from 'cafe_de_la_place/assets/audio_reponses/ALrd/le_fils_du_temps.mp3';
import sonChoixLeFilDuTemps from 'cafe_de_la_place/assets/audio_reponses/ALrd/le_fil_du_temps.mp3';
import sonChoixSoupconDAmertume from 'cafe_de_la_place/assets/audio_reponses/ALrd/soupcon_d_amertume.mp3';
import sonChoixSouponDAmertume from 'cafe_de_la_place/assets/audio_reponses/ALrd/soupon_d_amertume.mp3';
import sonChoixSoupconDAbertube from 'cafe_de_la_place/assets/audio_reponses/ALrd/soupcon_d_abertube.mp3';
import sonExercice from 'cafe_de_la_place/assets/audio_reponses/ALrd/exercice.mp3';
import sonAnguille from 'cafe_de_la_place/assets/audio_reponses/ALrd/anguille.mp3';
import sonDimoudon from 'cafe_de_la_place/assets/audio_reponses/ALrd/dimoudon.mp3';
import sonSoupcon from 'cafe_de_la_place/assets/audio_reponses/ALrd/soupcon.mp3';
import sonChoixMembreGroupe from 'cafe_de_la_place/assets/audio_reponses/ACrd/membre_du_groupe.mp3';
import sonChoixProducteur from 'cafe_de_la_place/assets/audio_reponses/ACrd/producteur.mp3';
import sonChoixCritiqueMusical from 'cafe_de_la_place/assets/audio_reponses/ACrd/critique_musical.mp3';
import sonChoixReggae from 'cafe_de_la_place/assets/audio_reponses/ACrd/reggae.mp3';
import sonChoixJazz from 'cafe_de_la_place/assets/audio_reponses/ACrd/jazz.mp3';
import sonChoixRockFrancais from 'cafe_de_la_place/assets/audio_reponses/ACrd/rock_francais.mp3';
import sonChoixJazzBandDeLondres from 'cafe_de_la_place/assets/audio_reponses/ACrd/jazz_band_de_londres.mp3';
import sonChoixNtm from 'cafe_de_la_place/assets/audio_reponses/ACrd/ntm.mp3';
import sonChoixRockerset from 'cafe_de_la_place/assets/audio_reponses/ACrd/rockerset.mp3';
import sonChoixDrole from 'cafe_de_la_place/assets/audio_reponses/ACrd/drole.mp3';
import sonChoixInventif from 'cafe_de_la_place/assets/audio_reponses/ACrd/inventif.mp3';
import sonChoixNeuf from 'cafe_de_la_place/assets/audio_reponses/ACrd/neuf.mp3';
import sonChoixTempsPresent from 'cafe_de_la_place/assets/audio_reponses/ACrd/le_temps_present.mp3';
import sonChoixTempsFutur from 'cafe_de_la_place/assets/audio_reponses/ACrd/le_temps_futur.mp3';
import sonChoixTempsPasse from 'cafe_de_la_place/assets/audio_reponses/ACrd/le_temps_passe.mp3';
import sonCuisine from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_cuisine.mp3';
import sonSaladiers from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_saladiers.mp3';
import sonVerre from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_verre.mp3';
import sonMayonnaise from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_mayonnaise.mp3';
import sonSel from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_sel.mp3';
import sonTomates from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_tomates.mp3';
import sonPays from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_pays.mp3';
import sonPoivrons from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_poivrons.mp3';
import sonEpices from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_epices.mp3';
import sonDonnent from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_donnent.mp3';
import sonDouzaines from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_douzaines.mp3';
import sonAssiettes from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_assiettes.mp3';
import sonFouets from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_fouets.mp3';
import sonLouche from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_louche.mp3';
import sonPassoire from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_passoire.mp3';
import sonPoele from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_poele.mp3';
import sonLuxe from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_luxe.mp3';
import sonCasserole from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_casserole.mp3';
import sonAdhere from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_adhere.mp3';
import sonAlcoolique from 'cafe_de_la_place/assets/audio_reponses/APlc/ecrivez_alcoolique.mp3';
import sonCouverture from 'cafe_de_la_place/assets/audio_reponses/LOdi/couverture.mp3';
import sonMotsCroises from 'cafe_de_la_place/assets/audio_reponses/LOdi/mots_croises.mp3';
import sonProgrammeTele from 'cafe_de_la_place/assets/audio_reponses/LOdi/programme_tele.mp3';
import soncercleDicotino from 'cafe_de_la_place/assets/audio_reponses/LOdi/cercle_dicotino.mp3';
import soncirqueDicotino from 'cafe_de_la_place/assets/audio_reponses/LOdi/cirque_dicotino.mp3';
import sonCirqueEtClown from 'cafe_de_la_place/assets/audio_reponses/LOdi/cirque_et_clown.mp3';
import sonCirqueTino from 'cafe_de_la_place/assets/audio_reponses/LOdi/cirque_tino.mp3';
import madameCoupin from 'cafe_de_la_place/assets/audio_reponses/LOdi/madame_coupin.mp3';
import modeChapeau from 'cafe_de_la_place/assets/audio_reponses/LOdi/mode_chapeau.mp3';
import livre from 'cafe_de_la_place/assets/audio_reponses/LOdi/livre.mp3';
import confectionChapeau from 'cafe_de_la_place/assets/audio_reponses/LOdi/confection_chapeau.mp3';
import chapeauMadameCoupin from 'cafe_de_la_place/assets/audio_reponses/LOdi/chapeau_madame_coupin.mp3';
import chapeauMadameCoutin from 'cafe_de_la_place/assets/audio_reponses/LOdi/chapeau_madame_coutin.mp3';
import chapeauMadameGoubin from 'cafe_de_la_place/assets/audio_reponses/LOdi/chapeau_madame_goubin.mp3';
import chatMadameCoupin from 'cafe_de_la_place/assets/audio_reponses/LOdi/chat_madame_coupin.mp3';
import dinoDepanto from 'cafe_de_la_place/assets/audio_reponses/LOdi/dino_depanto.mp3';
import dinoDepianto from 'cafe_de_la_place/assets/audio_reponses/LOdi/dino_depianto.mp3';
import binoBepanto from 'cafe_de_la_place/assets/audio_reponses/LOdi/bino_bepanto.mp3';
import binoBepianto from 'cafe_de_la_place/assets/audio_reponses/LOdi/bino_bepianto.mp3';
import belgique from 'cafe_de_la_place/assets/audio_reponses/LOdi/belgique.mp3';
import brousse from 'cafe_de_la_place/assets/audio_reponses/LOdi/brousse.mp3';
import bresse from 'cafe_de_la_place/assets/audio_reponses/LOdi/bresse.mp3';
import bruges from 'cafe_de_la_place/assets/audio_reponses/LOdi/bruges.mp3';
import son17Ans from 'cafe_de_la_place/assets/audio_reponses/LOdi/17_ans.mp3';
import son18Ans from 'cafe_de_la_place/assets/audio_reponses/LOdi/18_ans.mp3';
import son24Ans from 'cafe_de_la_place/assets/audio_reponses/LOdi/24_ans.mp3';
import sonPlusAge from 'cafe_de_la_place/assets/audio_reponses/LOdi/plus_age.mp3';
import sonPlusJeune from 'cafe_de_la_place/assets/audio_reponses/LOdi/plus_jeune.mp3';
import sonMemeAge from 'cafe_de_la_place/assets/audio_reponses/LOdi/meme_age.mp3';
import sonDramatique from 'cafe_de_la_place/assets/audio_reponses/LOdi/dramatique.mp3';
import sonChoquant from 'cafe_de_la_place/assets/audio_reponses/LOdi/choquant.mp3';
import sonErotique from 'cafe_de_la_place/assets/audio_reponses/LOdi/erotique.mp3';
import sonPoetique from 'cafe_de_la_place/assets/audio_reponses/LOdi/poetique.mp3';

const AUDIOS_CONSIGNES = {
  sous_consigne_ALrd_1: sousConsigneALrd1,
  sous_consigne_ALrd_2: sousConsigneALrd2,
  sous_consigne_ACrd_1: sousConsigneACrd1,
  sous_consigne_ACrd_2: sousConsigneACrd2,
  sous_consigne_APlc_1: sousConsigneAPlc1,
  sous_consigne_APlc_2: sousConsigneAPlc2,
  sous_consigne_LOdi_1: sousConsigneLOdi1,
  sous_consigne_LOdi_2: sousConsigneLOdi2
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
  acrd_1: ACrd1,
  acrd_2: ACrd2,
  acrd_3: ACrd3,
  acrd_4: ACrd4,
  acrd_5: ACrd5,
  acrd_6: ACrd6,
  acrd_7: ACrd7,
  acrd_8: ACrd8,
  acrd_9: ACrd9,
  acrd_10: ACrd10,
  aplc_1: questionAPlc,
  lodi_1: LOdi1,
  lodi_2: LOdi2,
  lodi_3: LOdi3,
  lodi_4: LOdi4,
  lodi_5: LOdi5,
  lodi_6: LOdi6,
  lodi_7: LOdi7,
  lodi_8: LOdi8,
  lodi_9: LOdi9,
  lodi_10: LOdi10
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
  membre_du_groupe: sonChoixMembreGroupe,
  producteur: sonChoixProducteur,
  critique_musical: sonChoixCritiqueMusical,
  reggae: sonChoixReggae,
  jazz: sonChoixJazz,
  rock_francais: sonChoixRockFrancais,
  jazz_band_de_londres: sonChoixJazzBandDeLondres,
  ntm: sonChoixNtm,
  rockerset: sonChoixRockerset,
  drole: sonChoixDrole,
  inventif: sonChoixInventif,
  neuf: sonChoixNeuf,
  temps_present: sonChoixTempsPresent,
  temps_futur: sonChoixTempsFutur,
  temps_passe: sonChoixTempsPasse,
  cuisine: sonCuisine,
  saladiers: sonSaladiers,
  verre: sonVerre,
  mayonnaise: sonMayonnaise,
  sel: sonSel,
  tomates: sonTomates,
  pays: sonPays,
  poivrons: sonPoivrons,
  epices: sonEpices,
  donnent: sonDonnent,
  douzaines: sonDouzaines,
  assiettes: sonAssiettes,
  fouets: sonFouets,
  louche: sonLouche,
  passoire: sonPassoire,
  poele: sonPoele,
  luxe: sonLuxe,
  casserole: sonCasserole,
  adhere: sonAdhere,
  alcoolique: sonAlcoolique,
  couverture: sonCouverture,
  programme_tele: sonProgrammeTele,
  mots_croises: sonMotsCroises,
  cercle_dicotino: soncercleDicotino,
  cirque_et_clown: sonCirqueEtClown,
  cirque_dicotino: soncirqueDicotino,
  cirque_tino: sonCirqueTino,
  madame_coupin: madameCoupin,
  mode_chapeau: modeChapeau,
  livre: livre,
  confection_chapeau: confectionChapeau,
  chapeau_madame_coupin: chapeauMadameCoupin,
  chapeau_madame_coutin: chapeauMadameCoutin,
  chapeau_madame_goubin: chapeauMadameGoubin,
  chat_madame_coupin: chatMadameCoupin,
  dino_depanto: dinoDepanto,
  dino_depianto: dinoDepianto,
  bino_bepanto: binoBepanto,
  bino_bepianto: binoBepianto,
  belgique: belgique,
  brousse: brousse,
  bresse: bresse,
  bruges: bruges,
  dix_sept_ans: son17Ans,
  dix_huit_ans: son18Ans,
  vingt_quatre_ans: son24Ans,
  plus_age: sonPlusAge,
  plus_jeune: sonPlusJeune,
  meme_age: sonMemeAge,
  dramatique: sonDramatique,
  choquant: sonChoquant,
  erotique: sonErotique,
  poetique: sonPoetique
};

const messagesVideos = {};
const messagesAudios = { ...AUDIOS_CONSIGNES, ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesCafeDeLaPlace extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, messagesVideos, messagesAudios, fondSituation, sonConsigne);
    this.charge([fondSituation]);
  }

  fondSituation () {
    return this.ressource(fondSituation);
  }

  fondSituationEntrainement () {
    return this.ressource(fondSituation);
  }
}
