import { useMediaQuery } from 'react-responsive';

// One breakpoint for the whole site. Anything 1023px and under is "mobile":
// it gets the mobile hero and the compact nav. Tailwind `lg:` (1024px) is the
// matching CSS side, so layout classes should use `lg:`, not `md:`.
export const MOBILE_MAX = 1023;

export const useIsMobile = () => useMediaQuery({ maxWidth: MOBILE_MAX });

// Actual phones (under Tailwind `sm`). Only for things that need to know the
// screen is narrow, like the slide strip, not for the mobile vs desktop layout.
export const PHONE_MAX = 639;

export const useIsPhone = () => useMediaQuery({ maxWidth: PHONE_MAX });
