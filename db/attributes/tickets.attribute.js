exports.ticketsAttributes = async (databases, db, ticketsTable) => {
  await databases.createStringAttribute(db, ticketsTable, 'event_id', 36, true);
  await databases.createStringAttribute(db, ticketsTable, 'owner_id', 36, true);
  await databases.createIntegerAttribute(db, ticketsTable, 'price', true);
};
