const { i18n } = require("./next-i18next.config");

function redirects() {
  const theme = process.env.THEME;

  switch (theme) {
    case "ballerup":
      return [
        {
          source: "/was",
          destination:
            process.env.NODE_ENV === "production"
              ? "https://www.was.digst.dk/dhp-ballerup-dk"
              : "https://www.was.digst.dk/ballerup-dk",
          permanent: true,
        },
      ];
    case "kobenhavn":
      return [
        {
          source: "/was",
          destination: "https://www.was.digst.dk/blivhoert-kk-dk",
          permanent: true,
        },
      ];
    default:
      return [
        {
          source: "/was",
          destination: "https://www.was.digst.dk/blivhoert-kk-dk",
          permanent: true,
        },
      ];
  }
}

module.exports = ({ defaultConfig }) => {
  return {
    ...defaultConfig,
    redirects,
    i18n,
  };
};
