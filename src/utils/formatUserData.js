exports.formatUserData = (rawData) => {
  return {
    id: rawData.$id,
    email: rawData.email,
    password: rawData.password,
  };
};
