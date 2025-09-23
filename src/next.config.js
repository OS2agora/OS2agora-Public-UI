function redirects() {
  return [
    {
      source: "/was",
      destination: process.env.NODE_ENV === "production" ? "https://www.was.digst.dk/dhp-ballerup-dk" : "https://www.was.digst.dk/ballerup-dk",
      permanent: true,
    },
  ];
}

module.exports = ({ defaultConfig }) => {
  return {
    ...defaultConfig,
    redirects,
    images: {
      domains: ["localhost", "dhp.ballerup.dk", "dhp-test.balk.dk"]
    }
  };
};
