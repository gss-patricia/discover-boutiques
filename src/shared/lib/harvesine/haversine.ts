type DistanceProps = {
  initialLatitude: number;
  initialLongitude: number;
  finalLatitude: number;
  finalLongitude: number;
};

const RADIUS_IN_KM = 6371;

const parseToRadians = (deg: number) => deg * Math.PI / 180;;

const getDistanceFromLatLonInKm = ({
  initialLatitude,
  initialLongitude,
  finalLatitude,
  finalLongitude,
}: DistanceProps) => {
  const radiusInitialLatitude = parseToRadians(initialLatitude);
  const radiusFinalLatitude = parseToRadians(finalLatitude);
  const dLongitude = parseToRadians(finalLongitude - initialLongitude);
  const dLatitude = radiusFinalLatitude - radiusInitialLatitude;

  const distanceInKm =
    2 *
    RADIUS_IN_KM *
    Math.asin(
      Math.sqrt(
        Math.sin(dLatitude / 2) * Math.sin(dLatitude / 2) +
          Math.cos(radiusInitialLatitude) *
            Math.cos(radiusFinalLatitude) *
            Math.sin(dLongitude / 2) *
            Math.sin(dLongitude / 2)
      )
    );
  return distanceInKm;
};


export default getDistanceFromLatLonInKm;