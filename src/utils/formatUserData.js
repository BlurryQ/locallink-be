exports.formatUserData = (rawData) => {
  console.log(rawData);
  return {
    id: rawData.$id,
    email: rawData.email,
    password: rawData.password,
  };
};
