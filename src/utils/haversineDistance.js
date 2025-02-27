exports.haversineDistance = (coords1, coords2) => {
  const getRadiansFromDegrees = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  const EARTH_RADIUS_IN_METERS = 6371e3;

  const sourceLatitudeInRadians = getRadiansFromDegrees(coords1.lat);
  const destinationLatitudeInRadians = getRadiansFromDegrees(coords2.lat);
  const latitudeDifference = getRadiansFromDegrees(coords2.lat - coords1.lat);
  const longitudeDifference = getRadiansFromDegrees(
    coords2.long - coords1.long
  );
  const haversineOfCentralAngle =
    Math.pow(Math.sin(latitudeDifference / 2), 2) +
    Math.cos(sourceLatitudeInRadians) *
      Math.cos(destinationLatitudeInRadians) *
      Math.pow(Math.sin(longitudeDifference / 2), 2);
  const centralAngle =
    2 *
    Math.atan2(
      Math.sqrt(haversineOfCentralAngle),
      Math.sqrt(1 - haversineOfCentralAngle)
    );
  const distanceInMeters = EARTH_RADIUS_IN_METERS * centralAngle;
  const distanceInMiles = distanceInMeters / 1609.34;

  return Number(distanceInMiles.toFixed(3));
};
