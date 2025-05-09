import { niveau1, niveau2, niveau3 } from './numeratie';
import { N1Rrn, N1Rde, N1Res, N1Ron, N1Roa, N1Ros, N2Rlp, N2Rpe, N2Rsu, N2Rom, N2Ron, N2Rod, N2Rut, N2Rrh, N2Rtg, N2Rpl, N3Rpl, N3Rut, N3Rpo, N3Rpr, N3Rps, N3Rvo, N3Rrp } from './rattrapage';

const configurationNormale = {
  questions: {
    'N1': niveau1,
    'N2': niveau2,
    'N3': niveau3,
    'N1Prn': N1Rrn,
    'N1Pde': N1Rde,
    'N1Pes': N1Res,
    'N1Pon': N1Ron,
    'N1Poa': N1Roa,
    'N1Pos': N1Ros,
    'N2Plp': N2Rlp,
    'N2Ppe': N2Rpe,
    'N2Psu': N2Rsu,
    'N2Pom': N2Rom,
    'N2Pon': N2Ron,
    'N2Pod': N2Rod,
    'N2Put': N2Rut,
    'N2Prh': N2Rrh,
    'N2Ptg': N2Rtg,
    'N2Ppl': N2Rpl,
    'N3Ppl': N3Rpl,
    'N3Put': N3Rut,
    'N3Ppo': N3Rpo,
    'N3Ppr': N3Rpr,
    'N3Pps': N3Rps,
    'N3Pvo': N3Rvo,
    'N3Prp': N3Rrp
  }
};

export { configurationNormale };
