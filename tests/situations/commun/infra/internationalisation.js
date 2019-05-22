import { format } from 'commun/infra/internationalisation';
import { initialise } from '../aides/internationalisation';

describe("L'internationalisation", function () {
  beforeEach(function () {
    return initialise({
      duree: 'duree_{{minutes}}_{{secondes}}',
      minute: '{{count}}',
      seconde: '{{count}}'
    });
  });

  it('permet de formater des durées en minutes et secondes', function () {
    expect(format(6000, 'duree')).to.eql('duree_0_6');
    expect(format(6400, 'duree')).to.eql('duree_0_6');
    expect(format(50000, 'duree')).to.eql('duree_0_50');
    expect(format(60001, 'duree')).to.eql('duree_1_0');
    expect(format(65000, 'duree')).to.eql('duree_1_5');
  });
});
