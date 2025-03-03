exports.haversineDistance = (location, destination) => {
  const getRadiansFromDegrees = (degrees) => {
    return (degrees * Math.PI) / 180;
  };

  const EARTH_RADIUS_IN_METERS = 6371e3;

  const locationLatitudeInRadians = getRadiansFromDegrees(location.lat);
  const destinationLatitudeInRadians = getRadiansFromDegrees(destination.lat);
  const latitudeDifference = getRadiansFromDegrees(
    destination.lat - location.lat
  );
  const longitudeDifference = getRadiansFromDegrees(
    destination.long - location.long
  );
  const haversineOfCentralAngle =
    Math.pow(Math.sin(latitudeDifference / 2), 2) +
    Math.cos(locationLatitudeInRadians) *
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
