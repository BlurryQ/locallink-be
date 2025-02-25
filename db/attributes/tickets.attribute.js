exports.ticketsAttributes = async (databases, db, ticketsTable) => {
  await databases.createIntegerAttribute(db, ticketsTable, 'event_id', true);
  await databases.createIntegerAttribute(db, ticketsTable, 'owner_id', true);
  await databases.createIntegerAttribute(db, ticketsTable, 'price', true);
};
