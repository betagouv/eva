import { pourcentageX, pourcentageY } from 'commun/data/scene';

const pieces = [
  { type: 'bonbon3', y: pourcentageY(430), x: pourcentageX(855) },
  { type: 'bonbon6', y: pourcentageY(430), x: pourcentageX(301) },

  { type: 'bonbon2', y: pourcentageY(433), x: pourcentageX(723) },
  { type: 'bonbon6', y: pourcentageY(433), x: pourcentageX(335) },
  { type: 'bonbon1', y: pourcentageY(433), x: pourcentageX(196) },

  { type: 'bonbon8', y: pourcentageY(434), x: pourcentageX(688) },
  { type: 'bonbon7', y: pourcentageY(435), x: pourcentageX(450) },
  { type: 'bonbon7', y: pourcentageY(437), x: pourcentageX(474) },
  { type: 'bonbon2', y: pourcentageY(439), x: pourcentageX(289) },

  { type: 'bonbon2', y: pourcentageY(443), x: pourcentageX(706) },
  { type: 'bonbon8', y: pourcentageY(443), x: pourcentageX(403) },
  { type: 'bonbon11', y: pourcentageY(443), x: pourcentageX(243) },

  { type: 'bonbon6', y: pourcentageY(445), x: pourcentageX(387) },
  { type: 'bonbon9', y: pourcentageY(445), x: pourcentageX(231) },

  { type: 'bonbon3', y: pourcentageY(447), x: pourcentageX(91) },

  { type: 'bonbon12', y: pourcentageY(448), x: pourcentageX(501) },
  { type: 'bonbon12', y: pourcentageY(448), x: pourcentageX(174) },

  { type: 'bonbon10', y: pourcentageY(450), x: pourcentageX(638) },
  { type: 'bonbon5', y: pourcentageY(450), x: pourcentageX(281) },
  { type: 'bonbon10', y: pourcentageY(450), x: pourcentageX(255) },
  { type: 'bonbon12', y: pourcentageY(450), x: pourcentageX(51) },

  { type: 'bonbon9', y: pourcentageY(451), x: pourcentageX(832) },
  { type: 'bonbon11', y: pourcentageY(451), x: pourcentageX(299) },

  { type: 'bonbon5', y: pourcentageY(452), x: pourcentageX(457) },
  { type: 'bonbon9', y: pourcentageY(453), x: pourcentageX(619) },
  { type: 'bonbon10', y: pourcentageY(455), x: pourcentageX(140) },

  { type: 'bonbon12', y: pourcentageY(456), x: pourcentageX(671) },
  { type: 'bonbon3', y: pourcentageY(456), x: pourcentageX(346) },

  { type: 'bonbon3', y: pourcentageY(458), x: pourcentageX(308) },
  { type: 'bonbon10', y: pourcentageY(462), x: pourcentageX(303) },
  { type: 'bonbon4', y: pourcentageY(463), x: pourcentageX(230) },
  { type: 'bonbon2', y: pourcentageY(464), x: pourcentageX(453) },
  { type: 'bonbon11', y: pourcentageY(466), x: pourcentageX(750) },
  { type: 'bonbon4', y: pourcentageY(468), x: pourcentageX(404) },
  { type: 'bonbon5', y: pourcentageY(469), x: pourcentageX(328) },
  { type: 'bonbon7', y: pourcentageY(470), x: pourcentageX(751) },

  { type: 'bonbon1', y: pourcentageY(471), x: pourcentageX(632) },
  { type: 'bonbon9', y: pourcentageY(471), x: pourcentageX(605) },
  { type: 'bonbon7', y: pourcentageY(471), x: pourcentageX(440) },

  { type: 'bonbon5', y: pourcentageY(473), x: pourcentageX(654) },

  { type: 'bonbon4', y: pourcentageY(474), x: pourcentageX(808) },
  { type: 'bonbon11', y: pourcentageY(474), x: pourcentageX(402) },

  { type: 'bonbon6', y: pourcentageY(475), x: pourcentageX(374) },

  { type: 'bonbon8', y: pourcentageY(476), x: pourcentageX(713) },
  { type: 'bonbon8', y: pourcentageY(476), x: pourcentageX(106) },

  { type: 'bonbon1', y: pourcentageY(477), x: pourcentageX(795) },
  { type: 'bonbon4', y: pourcentageY(477), x: pourcentageX(664) },
  { type: 'bonbon1', y: pourcentageY(477), x: pourcentageX(316) }
];

const bacs = [
  { categorie: 'bonbon10', x: 10.5, y: 4 },
  { categorie: 'bonbon6', x: 10.5, y: 31 },
  { categorie: 'bonbon11', x: 10.5, y: 57 },

  { categorie: 'bonbon4', x: 30, y: 4 },
  { categorie: 'bonbon9', x: 30, y: 31 },
  { categorie: 'bonbon8', x: 30, y: 57 },

  { categorie: 'bonbon7', x: 55, y: 4 },
  { categorie: 'bonbon3', x: 55, y: 31 },
  { categorie: 'bonbon1', x: 55, y: 57 },

  { categorie: 'bonbon5', x: 75, y: 4 },
  { categorie: 'bonbon12', x: 75, y: 31 },
  { categorie: 'bonbon2', x: 75, y: 57 }
];

export default { pieces, bacs };
