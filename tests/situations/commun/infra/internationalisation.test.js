import { format } from 'commun/infra/internationalisation';

describe("L'internationalisation", function () {
  function traductionMoqueeAttendue (minute, seconde) {
    return `duree{"minutes":"minute{\\"count\\":${minute}}","secondes":"seconde{\\"count\\":${seconde}}"}`;
  }

  it('permet de formater des durées en minutes et secondes', function () {
    expect(format(6000, 'duree')).toEqual(traductionMoqueeAttendue(0, 6));
    expect(format(6400, 'duree')).toEqual(traductionMoqueeAttendue(0, 6));
    expect(format(50000, 'duree')).toEqual(traductionMoqueeAttendue(0, 50));
    expect(format(60001, 'duree')).toEqual(traductionMoqueeAttendue(1, 0));
    expect(format(65000, 'duree')).toEqual(traductionMoqueeAttendue(1, 5));
  });
});
