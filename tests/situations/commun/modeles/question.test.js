import { nomTechniqueSansVariant } from 'commun/modeles/question';

describe('.nomTechniqueSansVariant', () => {
  it('retourne le nom sans variant quand on lui donne un nom avec variant', () => {
    expect(nomTechniqueSansVariant('N1Pse1__variant')).toBe('N1Pse1');
  });

  it('retourne le même nom quand on lui donne un nom sans variant', () => {
    expect(nomTechniqueSansVariant('N1Pse1')).toBe('N1Pse1');
  });

  it('retourne undefined quand le nom technique est undefined', () => {
    expect(nomTechniqueSansVariant(undefined)).toBe('');
  });
});
