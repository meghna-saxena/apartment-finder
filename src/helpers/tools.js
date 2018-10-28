import _ from 'lodash';

const findDistance = (first, second) => {
  const latDiff = first.coords.lat - second.coords.lat;
  const longDiff = first.coords.lon - second.coords.lon;
  return Math.sqrt(latDiff * latDiff + longDiff * longDiff);
}

export const getApartmentsByDistance = (apartments, sisterStreet) => {
  const sisterApartment = apartments.find((i) => {
    return sisterStreet === i.street;
  })

  const distanceSorter = (first, second) => {
    return findDistance(first, sisterApartment) - findDistance(second, sisterApartment);
  }
  return apartments.sort(distanceSorter);
}

export const getApartmentsByRooms = (apartments, rooms) => {
  const filteredApartments = apartments.filter(i => parseInt(_.get(i, "params.rooms", 0)) >= rooms);

  filteredApartments.sort((a, b) => a.params.rooms - b.params.rooms);

  return filteredApartments;
}

export const getApartmentsByStreetName = (apartments) => {
  const filteredApartments = apartments.filter(item => {
    if (item.params) {
      return (!item.params.rooms || !item.params.value)
    } else {
      return item;
    }
  });

  return filteredApartments.sort((a, b) => a.street > b.street);
}


