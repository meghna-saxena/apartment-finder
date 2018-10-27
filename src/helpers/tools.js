import _ from 'lodash';

const findDistance = (first, second) => {
  const latDiff = first.coords.lat - second.coords.lat;
  const longDiff = first.coords.lon - second.coords.lon;
  return Math.sqrt(latDiff * latDiff + longDiff * longDiff);
}

export const getApartmentsByDistance = (apartments, sisterStreet) => {
  const sisterApartment = apartments.find( (i) => {
    return sisterStreet === i.street;
  })

  const distanceSorter = (first, second) => {
    return findDistance(first, sisterApartment) - findDistance(second, sisterApartment);
  }
  return apartments.sort(distanceSorter);
}


export const getApartmentsByRooms = (apartments, rooms) => {
  return apartments.filter(i => parseInt(_.get(i, "params.rooms", 0)) >= rooms);
}

export const getApartmentsByStreetName = (apartments) => {
  return apartments.sort((a, b) => a.street > b.street);
}
