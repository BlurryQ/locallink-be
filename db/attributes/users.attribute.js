exports.usersAttributes = async (databases, db, ticketsTable) => {
  await databases.createStringAttribute(db, ticketsTable, 'email', 250, true);
  await databases.createStringAttribute(
    db,
    ticketsTable,
    'password',
    250,
    true
  );
};
