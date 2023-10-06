const filterNullProps = (client) => {
  const editedClient = {};
  for (const key in client) {
    if (client[key] !== null) {
      editedClient[key] = client[key];
    }
  }
  return editedClient;
};

module.exports = filterNullProps;
