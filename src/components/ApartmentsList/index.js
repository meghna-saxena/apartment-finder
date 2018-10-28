import React, { Component } from 'react';
import Apartment from '../Apartment';

import './ApartmentsList.css';

class ApartmentsList extends Component {
  render() {
    const { apartments } = this.props;

    const houses = apartments.map(item => <Apartment key={item.street} detail={item} />)

    return (
      <div>
        <div className="apartment-list-table">
          <div className="apartments-list-heading">{this.props.title}</div>
          <div>
            {houses}
          </div>
        </div>
      </div>
    );
  }
}

export default ApartmentsList;