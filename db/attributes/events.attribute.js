exports.eventsAttributes = async (databases, db, eventsTable) => {
  await databases.createStringAttribute(db, eventsTable, 'name', 64, true);
  await databases.createDatetimeAttribute(db, eventsTable, 'start', true);
  await databases.createDatetimeAttribute(db, eventsTable, 'end', true);
  await databases.createStringAttribute(
    db,
    eventsTable,
    'location',
    1024,
    true
  );
  await databases.createStringAttribute(db, eventsTable, 'organiser', 36, true);
  await databases.createIntegerAttribute(db, eventsTable, 'capacity', true);
  await databases.createStringAttribute(db, eventsTable, 'details', 2048, true);
  await databases.createStringAttribute(db, eventsTable, 'status', 32, true);
  await databases.createIntegerAttribute(db, eventsTable, 'price', true);
  await databases.createStringAttribute(db, eventsTable, 'category', 32, true);
  await databases.createStringAttribute(
    db,
    eventsTable,
    'image_url',
    128,
    false
  );
};
