import { isMobile, isIOs, isAndroid, isMobileOnly } from 'mobile-device-detect';

const estMobile = isMobile || isIOs || isAndroid;
const estSmartphone = isMobileOnly;

export { estMobile, estSmartphone };
