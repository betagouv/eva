<template>
  <div>
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
      <p>Les <trou-a-completer/> de Chine ne <trou-a-completer/> aucun <trou-a-completer/> contrairement à ce qui était annoncé dans le <trou-a-completer/>.</p>
    </div>
  </div>
</template>

<script>
import TrouACompleter from 'cafe_de_la_place/vues/components/trou_a_completer.vue';

export default {
  components: { TrouACompleter }
};
</script>
