import { isMobile, isIOs, isAndroid, isMobileOnly } from 'mobile-device-detect';

const estSmartphoneOuTablette = isMobile || isIOs || isAndroid;
const estSmartphone = isMobileOnly;

export { estSmartphoneOuTablette, estSmartphone };
