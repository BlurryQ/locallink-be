exports.ticketsAttributes = async (databases, db, ticketsTable) => {
  await databases.createStringAttribute(db, ticketsTable, 'event_id', 36, true);
  await databases.createIntegerAttribute(db, ticketsTable, 'owner_id', true);
  await databases.createIntegerAttribute(db, ticketsTable, 'price', true);
};
