# EVA-264 : Il ne doit pas y avoir l'ombre derrière la card d'aide 

[Lien du ticket](https://captive-team.atlassian.net/browse/EVA-264?atlOrigin=eyJpIjoiMWQyMGJjNWQxNmU1NGE1Yzk2MjZjZGViZDNlZDQ3NWUiLCJwIjoiaiJ9)


Dans le fichier css `fenetre_aide.scss` on a un `filter: drop-shadow()`.

J'ai trouvé une issue qui parle de notre pbr sur safari avec le `drop-shadow` : [Lien issues Github](https://github.com/mdn/browser-compat-data/issues/17726)


Il conseille de soit utiliser `box-shadow` ou plus d'ajouter `transform: translateZ(0);`

```scss
.fenetre-aide-presentation {
	...
	// J'ai ajouté ceci. Le prb est reglé
	transform: translateZ(0);
	filter: drop-shadow(0 5px 10px $couleur-ombre);
	...
}
```

