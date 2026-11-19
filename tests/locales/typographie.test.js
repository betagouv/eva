import fr from '../../src/locales/fr.json';

const ESPACE_FINE_INSECABLE = '\u202F';
const ESPACE_INCORRECTE = '(?: |\u00A0|&nbsp;)';
const REGLES = [
  new RegExp(`${ESPACE_INCORRECTE}[:!?;»]`, 'g'),
  new RegExp(`«${ESPACE_INCORRECTE}`, 'g')
];

function violations (traductions, chemin = []) {
  if (typeof traductions === 'string') {
    return REGLES.flatMap((regle) =>
      [...traductions.matchAll(regle)].map((correspondance) => {
        const debut = Math.max(0, correspondance.index - 20);
        const extrait = traductions.slice(debut, correspondance.index + correspondance[0].length);
        return `${chemin.join('.')} : ${JSON.stringify(extrait)}`;
      })
    );
  }
  if (traductions !== null && typeof traductions === 'object') {
    return Object.entries(traductions).flatMap(([cle, valeur]) => violations(valeur, [...chemin, cle]));
  }
  return [];
}

describe('La typographie des traductions', function () {
  it('accepte une espace fine insécable avant : ! ? ; et dans les guillemets', function () {
    const s = ESPACE_FINE_INSECABLE;
    expect(violations({ a: `Bravo${s}! Prêt${s}? Note${s}: oui${s}; «${s}ok${s}»` })).toEqual([]);
  });

  it('refuse une espace normale, insécable ou &nbsp; avant : ! ? ;', function () {
    expect(violations({ a: { b: 'Bravo !' } })).toEqual(['a.b : "Bravo !"']);
    expect(violations({ a: 'Prêt ?' })).toHaveLength(1);
    expect(violations({ a: 'Note&nbsp;:' })).toHaveLength(1);
    expect(violations({ a: 'oui ;' })).toHaveLength(1);
  });

  it('refuse une espace autre que fine insécable après « et avant »', function () {
    expect(violations({ a: '« ok »' })).toHaveLength(2);
    expect(violations({ a: '«&nbsp;ok »' })).toHaveLength(2);
  });

  it('est respectée dans fr.json', function () {
    expect(violations(fr)).toEqual([]);
  });
});
