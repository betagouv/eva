<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Les zones déposables du jeu sont automatiquement utilisées depuis le masque

> [EVA-187](https://captive-team.atlassian.net/browse/EVA-187)

## Frontend

1. Ajouter un svg fictif qui contient la classe `zone-depot` sur l'un de ses éléments et l'importer dans le composant `GlisserDeposerBillets.vue` (en attendant de pouvoir récupérer le svg du serveur)

2. Sachant que le svg envoyé par le serveur sera une url, décoder le contenu du svg (on aura pas besoin ici de l'injecter dans le DOM)

```javascript
  const svgContent = atob(this.question.zone_cliquable.split(',')[1]);
  const parser = new DOMParser();
  const svgDoc = parser.parseFromString(svgContent, 'image/svg+xml');
```

3. Récupérer son positionnement par rapport au parent le plus haut
```javascript
const zoneDepot = svgDoc.querySelector('.zone-depot');
if (zoneDepot) {
  this.positionRelative = {
    top: zoneDepot.getAttribute('y'),
    left: zoneDepot.getAttribute('x')
  };
}
```

4. Transmettre la props `positionRelative` au composant `GlisserDeposer`

5. Récupérer le style de positionRelative dans une computed
```javascript
computed: {
  styleZoneDepot () {
    if (!this.positionRelative) {
      return;
    }
    return {
      top: `${this.positionRelative.top}px`,
      left: `${this.positionRelative.left}px`
    };
  },
}
```

6. L'ajouter au template
```javascript
<div class="container-arrivee">
  <draggable
    class="zone-depot"
    :style="styleZoneDepot"
  />
</div>
```
