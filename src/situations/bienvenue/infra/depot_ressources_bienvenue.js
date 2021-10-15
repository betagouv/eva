import DepotRessourcesCommunes from 'commun/infra/depot_ressources_communes';

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

export default class DepotRessourcesBienvenue extends DepotRessourcesCommunes {
  constructor (chargeurs) {
    super(chargeurs, sonConsigne);
    this.charge(Object.values(AUDIOS_QUESTIONS));
  }

  messageAudio (nomTechniqueQuestion) {
    return this.ressource(AUDIOS_QUESTIONS[nomTechniqueQuestion]);
  }

  existeMessageAudio (nomTechniqueQuestion) {
    return nomTechniqueQuestion in AUDIOS_QUESTIONS;
  }
}
