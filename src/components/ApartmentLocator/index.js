import React, { Component } from 'react';
import axios from 'axios';
import _ from 'lodash';

import { getApartmentsByDistance, getApartmentsByRooms, getApartmentsByStreetName } from '../../helpers/tools';
import ApartmentsList from '../ApartmentsList';
import Apartment from '../Apartment';

import './ApartmentLocator.css';

class ApartmentLocator extends Component {
  state = {
    apartments: [],
    sisterStreet: "Eberswalder Straße 55"
  }

  componentDidMount() {
    axios.get('https://demo.interfacema.de/programming-assessment-1.0/buildings')
      .then(response => {
        this.setState({ apartments: response.data.houses });
      });
  }
  getTargetHome = (apartments) => {
    const targetHomes = getApartmentsByRooms(apartments, 10)
      .filter(i => {
        const price = parseInt(_.get(i, "params.value", 0));
        return price > 0 && price <= 5000000;
      })

    return getApartmentsByDistance(targetHomes, this.state.sisterStreet)
      .find(i => i.street !== this.state.sisterStreet);
  }
  render() {
    const { apartments, sisterStreet } = this.state;
    if (apartments.length === 0) {
      return null;
    }

    const apartmentsByDistance = getApartmentsByDistance(apartments, sisterStreet);
    const apartmentsByRooms = getApartmentsByRooms(apartments, 5)
    const apartmentsByStreetName = getApartmentsByStreetName(apartments);

    const targetHome = this.getTargetHome(apartments);

    return (
      <div className="my-container">

        <table>
          <tr>
            <td><ApartmentsList id={0} title="By Distance" apartments={apartmentsByDistance} /></td>
            <td><ApartmentsList id={1} title="By Rooms" apartments={apartmentsByRooms} /></td>
            <td><ApartmentsList id={2} title="By Alphabetical" apartments={apartmentsByStreetName} /></td>
          </tr>
        </table>
        <div className="target-home">
          <h5>Target Home: </h5>
          {<Apartment detail={targetHome} />}
        </div>
      </div>

    );
  }
}

export default ApartmentLocator;