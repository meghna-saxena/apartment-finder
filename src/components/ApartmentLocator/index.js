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
      <div className="container">
        <div className="target-home">
          <div className="target-home-body"><h4>Target Home: </h4>
            {<Apartment detail={targetHome} />}
          </div>
        </div>
        <table>
          <tbody>
            <tr>
              <td>
                <ApartmentsList title="Sorted by Distance" apartments={apartmentsByDistance} />
              </td>
              <td>
                <ApartmentsList title="Sorted by Rooms" apartments={apartmentsByRooms} />
              </td>
              <td>
                <ApartmentsList title="Missing Information" apartments={apartmentsByStreetName} />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}

export default ApartmentLocator;