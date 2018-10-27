import React, { Component } from 'react';
import Apartment from '../Apartment';

import './ApartmentsList.css';

class ApartmentsList extends Component {
  render() {
    const { apartments } = this.props;

    const houses = apartments.map(item => <tr><td><Apartment detail={item} /></td></tr>)

    return (
      <div>
        <table className="apartment-list-table">
          <th className="apartments-list-heading">{this.props.title}</th>
          <tbody>
            {houses}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ApartmentsList;