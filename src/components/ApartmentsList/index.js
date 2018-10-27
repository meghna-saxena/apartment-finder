import React, { Component } from 'react';
import Apartment from '../Apartment';

class ApartmentsList extends Component {
  render() {
    const { id, apartments } = this.props;
    console.log('apartments', id, apartments);

    const houses = apartments.map(item => <tr><td><Apartment key={item.street} detail={item} /></td></tr>)

    return (
      <div>
        <table className="apartmentList-table">
          <th><h3>{this.props.title}</h3></th>
          <tbody>
            {houses}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ApartmentsList;