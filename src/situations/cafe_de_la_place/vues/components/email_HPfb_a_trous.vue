<template>
  <div class="email-fleurs-bibelots">
    <svg class="email-fleurs-bibelots__ascenseur" width="8" height="100" viewBox="0 0 8 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="8" height="100" rx="4" fill="#D6DAEC"/>
    </svg>
    <div class="email-fleurs-bibelots__destinataire">
      Destinataire&nbsp;:
      <div class="nom">
        Charles Perrac <u>&lt;charles.perrac@fleursetbibelots.fr&gt;</u>
      </div>
    </div>
    <hr>
    <strong>Objet&nbsp;: Détail des articles non conformes</strong>
    <hr>
    <div class="email-fleurs-bibelots__message">
      <p>Bonjour mon ami&nbsp;!</p>
      <p>J'espère que tu vas bien.</p>
      <p>Comme convenu, je vais te décrire<br>les problèmes que j'ai eus hier, le 10 <trou-a-completer idQuestion="HPfb1"/>,<br>quand je t'ai remplacé à la boutique.</p>
      <p>Une commande est arrivée et elle ne correspondait pas à ta <trou-a-completer idQuestion="HPfb2"/>.</p>
      <p>Le <trou-a-completer idQuestion="HPfb3"/> d'<trou-a-completer idQuestion="HPfb4"/> était en <trou-a-completer idQuestion="HPfb5"/> avec la commande. Mais certains étaient dans un mauvais <trou-a-completer idQuestion="HPfb6"/> ou ne <trou-a-completer idQuestion="HPfb7"/> pas à ce qu'on attendait.</p>
      <p>Les dahlias, couleur bleu azuré, étaient en fait de couleur <trou-a-completer idQuestion="HPfb8"/>.</p>
      <p>Les <trou-a-completer idQuestion="HPfb9"/> de Chine ne <trou-a-completer idQuestion="HPfb10"/> aucun <trou-a-completer idQuestion="HPfb11"/> contrairement à ce qui était annoncé dans le <trou-a-completer idQuestion="HPfb12"/>.</p>
    </div>
  </div>
</template>

<script>
import 'cafe_de_la_place/styles/email_HPfb_a_trous.scss';
import TrouACompleter from 'cafe_de_la_place/vues/components/trou_a_completer.vue';

export default {
  components: { TrouACompleter },
};
</script>
