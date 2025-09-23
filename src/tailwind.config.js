const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans],
      },
      lineHeight: {
        2: ".875rem",
        11: "2.75rem",
        12: "3rem",
      },
      fontSize: {
        xxs: "0.625rem",
      },
      boxShadow: {
        DEFAULT: "0px 4px 4px -2px rgba(5, 9, 15, 0.1)",
      },
      margin: {
        tabletNegativeContainer: "-1.6875rem",
        desktopNegativeContainer: "-6.375rem",
        mobileButtonsToFooter: "1.625rem",
      },
      height: {
        13: "3.25rem",
        18: "4.5rem",
        23: "5.625rem",
        26: "6.5rem",
        30: "7.5rem",
        hearingCardText: "9.1875rem",
      },
      width: {
        13: "3.25rem",
        18: "4.5rem",
        userCircleTablet: "5.875rem",
        tabletGlobalMessage: "36.25rem",
        desktopGlobalMessage: "36.875rem",
        tabletHearingCard: "23.75rem",
        desktopHearingCard: "24.75rem",
      },
      maxWidth: {
        tabletHearingContent: "36.25rem",
        desktopHearingContent: "51rem",
      },
      inset: {
        6.5: "1.6875rem",
        25: "6.375rem",
      },
    },
    colors: {
      transparent: "transparent",
      current: "currentColor",
      blue: {
        grey: "#85A5D6",
        dark: "#1D3557",
        center: "#1556EA",
        centerClick: "#003ECB",
        myHearings: "#0068B8",
        archivedHearings: "#0593E1",
      },
      grey: {
        textField: "#FBFDFF",
        light: "#F7F9FC",
        DEFAULT: "#BDC4CC",
        dark: "#566779",
      },
      green: {
        highlight: "#BEEBEB",
        currentHearing: "#20B6B5",
        dark: "#188A8A",
      },
      black: "#05090F",
      white: "#FFFFFF",
      red: "#FF5C4C",
    },
    screens: {
      tablet: "834px",
      desktop: "1440px",
    },
    container: {
      padding: {
        DEFAULT: "1.25rem",
        tablet: "1.6875rem",
        desktop: "6.375rem",
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ["active"],
      borderColor: ["active"],
      textColor: ["active"],
      margin: ["hover", "group-hover"],
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
