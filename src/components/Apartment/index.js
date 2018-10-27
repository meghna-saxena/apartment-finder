import React from 'react';
import _ from 'lodash';
import './Apartment.css';

import image from '../../images/homeIcon.png'

const Apartment = ({ detail }) => {
  const rooms = _.get(detail, "params.rooms");
  const value = _.get(detail, "params.value");
  return (
    <div className="apartment">
      <table className="apartment-table">
        <tr>
          <td>
            <img src={image} className="img" alt="homeIcon" />
          </td>
          <tbody>
            <td>
              <h5>{detail.street}</h5>
            </td>
            <tr><td>Price: {value}</td></tr>
            <tr><td>Rooms: {rooms}</td></tr>
          </tbody>
        </tr>
      </table>
    </div>
      )
    };
    
export default Apartment;