import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

// QUESTIONS
import sonConsigne from 'bienvenue/assets/consigne_demarrage.wav';
import concentrationQuestion from 'bienvenue/assets/audio_questions/concentration_question.wav';
import comprendreVite from 'bienvenue/assets/audio_questions/comprendre_vite.wav';
import confondreObjets from 'bienvenue/assets/audio_questions/confondre_objets.wav';
import voirCeQuiVaPas from 'bienvenue/assets/audio_questions/voir_ce_qui_va_pas.wav';
import decouperTache from 'bienvenue/assets/audio_questions/decouper_tache.wav';
import sansFaireErreur from 'bienvenue/assets/audio_questions/sans_faire_erreur.wav';
import voirLesDangers from 'bienvenue/assets/audio_questions/voir_les_dangers.wav';
import problemeVue from 'bienvenue/assets/audio_questions/probleme_vue.wav';
import differencierCouleurs from 'bienvenue/assets/audio_questions/differencier_couleurs.wav';
import bienEntendre from 'bienvenue/assets/audio_questions/bien_entendre.wav';
import malAConcentrer from 'bienvenue/assets/audio_questions/mal_a_concentrer.wav';
import ecransMalTete from 'bienvenue/assets/audio_questions/ecrans_mal_tete.wav';
import difficultesOrdinateur from 'bienvenue/assets/audio_questions/difficultes_ordinateur.wav';
import difficultesTablette from 'bienvenue/assets/audio_questions/difficultes_tablette.wav';
import suiviDys from 'bienvenue/assets/audio_questions/suivi_dys.wav';
import alleEcole from 'bienvenue/assets/audio_questions/alle_ecole.wav';

// REPONSES
import lunettes from 'bienvenue/assets/audio_reponses/lunette.wav';
import nonCorrige from 'bienvenue/assets/audio_reponses/non_corrige.wav';
import lunettesInefficaces from 'bienvenue/assets/audio_reponses/vous_avez_des_lunettes.wav';
import pasDeProblemes from 'bienvenue/assets/audio_reponses/pas_de_problemes.wav';
import ouiEtranger from 'bienvenue/assets/audio_reponses/oui_etranger.wav';
import ouiFrance from 'bienvenue/assets/audio_reponses/oui_france.wav';
import oui from 'bienvenue/assets/audio_reponses/oui.wav';
import non from 'bienvenue/assets/audio_reponses/non.wav';

const AUDIOS_QUESTIONS = {
  bienvenue_1: concentrationQuestion,
  bienvenue_2: comprendreVite,
  bienvenue_3: confondreObjets,
  bienvenue_4: voirCeQuiVaPas,
  bienvenue_5: decouperTache,
  bienvenue_6: sansFaireErreur,
  bienvenue_7: voirLesDangers,
  bienvenue_8: problemeVue,
  bienvenue_9: differencierCouleurs,
  bienvenue_10: bienEntendre,
  bienvenue_11: malAConcentrer,
  bienvenue_12: ecransMalTete,
  bienvenue_13: difficultesOrdinateur,
  bienvenue_14: difficultesTablette,
  bienvenue_15: suiviDys,
  bienvenue_16: alleEcole
};

const AUDIOS_REPONSES = {
  bienvenue_8_reponse_1: lunettes,
  bienvenue_8_reponse_2: nonCorrige,
  bienvenue_8_reponse_3: lunettesInefficaces,
  bienvenue_8_reponse_4: pasDeProblemes,
  bienvenue_16_reponse_1: ouiFrance,
  bienvenue_16_reponse_2: ouiEtranger,
  bienvenue_oui: oui,
  bienvenue_non: non
};

const AUDIOS_QUESTIONS_REPONSES = { ...AUDIOS_QUESTIONS, ...AUDIOS_REPONSES };

export default class DepotRessourcesBienvenue extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.charge(Object.values(AUDIOS_QUESTIONS_REPONSES));
  }

  messageAudio (nomTechnique) {
    return this.ressource(AUDIOS_QUESTIONS_REPONSES[nomTechnique]);
  }

  existeMessageAudio (nomTechnique) {
    return nomTechnique in AUDIOS_QUESTIONS_REPONSES;
  }
}
