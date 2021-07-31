const getConfigurations = async (req, res, next) => {
  res.send({
    isLocalAuthEnabled: process.env.IS_LOCAL_AUTH_ENABLED,
    isMicrosoftAuthEnabled: process.env.IS_MICROSOFT_AUTH_ENABLED,
  });
};

module.exports = { getConfigurations };
