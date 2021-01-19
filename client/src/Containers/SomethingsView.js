import React from 'react';

import SomethingAdd from '../Components/SomethingAdd';
import SomethingsList from '../Components/SomethingsList';

function SomethingsView({ ...rest }) {
  return (
    <div {...rest}>
      <h1>Somethings</h1>
      <SomethingAdd />
      <br />
      <SomethingsList />
    </div>
  );
}

export default SomethingsView;
