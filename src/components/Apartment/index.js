import React from 'react';
import _ from 'lodash';
import './Apartment.css';

import image from '../../images/homeIcon.png'

const Apartment = ({ detail }) => {
  const rooms = _.get(detail, "params.rooms");
  const value = _.get(detail, "params.value");
  return (
    <div className="apartment">
      <div className="apartment-table">
        <div>
          <img src={image} className="img" alt="homeIcon" />
          <h5>{detail.street}</h5>
        </div>
        <div>Price: {value}</div>
        <div>Rooms: {rooms}</div>
      </div>
    </div>

  )
};

export default Apartment;