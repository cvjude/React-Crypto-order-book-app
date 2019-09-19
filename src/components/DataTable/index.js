import React from 'react';
import Spinner from '../Spinner';
import './style.scss';

export default function AsksTable({ data, title, description }) {
  if (!data || data.lenght === 0)
    return (
      <div className="data">
        <Spinner />
      </div>
    );

  const pairs = data.map((pair, index) => (
    <div key={index} className="dataPair">
      <ul>
        <li>
          {index + 1}
        </li>
        <li>
          {Number(pair[0]).toFixed(2)}
        </li>
        <li>
          {Number(pair[1]).toFixed(4)}
        </li>
      </ul>
    </div>
  ));
  return (
    <div className="data">
      <div className="dataHeader">
        <h4>{title}</h4>
        <div className="dataPair">
          <ul>
            <li>
            </li>
            <li>
              {description.split('/')[0]}
            </li>
            <li>
              {description.split('/')[1]}
            </li>
          </ul>
        </div>
      </div>
      <div className="content">
        {pairs}
      </div>
    </div>
  )
}
