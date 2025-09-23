import useMediaQuery from "./useMediaQuery";
// ------------------------- Utilities ------------------------- //

const up = (value: number) => `@media (min-width:${value}px)`;
const down = (value: number) => `@media (max-width:${value - 5 / 100}px)`;
const between = (start: number, end: number) => `@media (min-width:${start}px and (max-width:${end - 5 / 100}px`;

const smallScreen = 375;
const mediumScreen = 834;
const largeScreen = 1440;

// ------------------------- Breakpoint - Up ------------------------- //

// Extra small devices (portrait phones, less than 375px)
// No media query since this is the default

// Small devices (portrait phones, 375px and up)
const smallDeviceUp = up(smallScreen);

// Large devices (tablets, 834px and up)
const mediumDeviceUp = up(mediumScreen);

// Large devices (desktops, 1440 and up)
const largeDeviceUp = up(largeScreen);

// ------------------------ Breakpoint - Down ------------------------ //

// Extra small devices (portrait phones, less than 375px)
const extraSmallDeviceDown = down(smallScreen);

// Medium devices (tablets, less than 834px)
const mediumDeviceDown = down(mediumScreen);

// Large devices (desktops, less than 1440px)
const largeDeviceDown = down(largeScreen);

// Extra large devices (large desktops)
// No media query since the extra-large breakpoint has no upper bound on its width

// ------------------------ Breakpoint - Only ------------------------ //

// Extra small devices (portrait phones, less than 375px)
const extraSmallDeviceOnly = down(smallScreen);

// Small devices (landscape phones, 375px and up to 834px)
const smallDeviceOnly = between(smallScreen, mediumScreen);

// Large devices (desktops, 834px and up to 1440px)
const largeDeviceOnly = between(mediumScreen, largeScreen);

// Extra large devices (large desktops, 1200px and up)
const extraLargeDeviceOnly = up(largeScreen);

// ------------------------ Media Query Hooks ------------------------ //

const useSmallDeviceUp = () => useMediaQuery(smallDeviceUp);
const useMediumDeviceUp = () => useMediaQuery(mediumDeviceUp);
const useLargeDeviceUp = () => useMediaQuery(largeDeviceUp);

const useExtraSmallDeviceDown = () => useMediaQuery(extraSmallDeviceDown);
const useMediumDeviceDown = () => useMediaQuery(mediumDeviceDown);
const useLargeDeviceDown = () => useMediaQuery(largeDeviceDown);

const useExtraSmallDeviceOnly = () => useMediaQuery(extraSmallDeviceOnly);
const useSmallDeviceOnly = () => useMediaQuery(smallDeviceOnly);
const useLargeDeviceOnly = () => useMediaQuery(largeDeviceOnly);
const useExtraLargeDeviceOnly = () => useMediaQuery(extraLargeDeviceOnly);

export {
  useSmallDeviceUp,
  useMediumDeviceUp,
  useLargeDeviceUp,
  useExtraSmallDeviceDown,
  useMediumDeviceDown,
  useLargeDeviceDown,
  useExtraSmallDeviceOnly,
  useSmallDeviceOnly,
  useLargeDeviceOnly,
  useExtraLargeDeviceOnly,
};
