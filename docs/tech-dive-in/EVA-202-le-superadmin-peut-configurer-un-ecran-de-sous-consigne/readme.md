<!-- 📄 Standard : https://www.notion.so/captive/Le-cadrage-technique-dbb611e45f114737a6b14745caa584e9?pvs=4 -->
# Le superadmin peut configurer un écran de sous-consigne

> [EVA-202](https://captive-team.atlassian.net/browse/EVA-202)

## Frontend

1. Configurer l'ordre d'appararition des sous-consignes de numératie dans `numeratie.js` et `rattrapage.js`

```javascript
const niveau1 = {
  series: [
    { cartes: [ N1Pse1, N1Pse2, N1Pse3, N1Pse4] },
    { cartes: [sousConsigne]}
    { cartes: [ N1Prn1, N1Prn2] },
  (...)
  ]
}


const N1Rrn = {
  series: [
    { cartes: [sousConsigne]}
    { cartes: [ N1Rrn1, N1Rrn2 ] },
  ]
};
```

2. Ajouter les données nécessaires au paramétrage du front de `N1Prn-sous-consigne` et `N1Rrn-sous-consigne`
- id
- nom_technique

## Backend

1. Permettre d'ajouter un audio et une illustration au model questionSousConsigne

2. Modifier le json envoyé au client
```ruby
  def as_json(_options = nil)
    json = slice(:id, :nom_technique)
    json['type'] = 'sous-consigne'
    json['intitule'] = transcription_intitule&.ecrit
    json['illustration'] = cdn_for(illustration)
    json['audio_url'] = transcription_intitule&.audio_url

    json
  end
```
