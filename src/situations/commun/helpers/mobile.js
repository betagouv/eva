import { isMobile, isIOs, isAndroid } from 'mobile-device-detect';

const estMobile = isMobile || isIOs || isAndroid;

export { estMobile };
