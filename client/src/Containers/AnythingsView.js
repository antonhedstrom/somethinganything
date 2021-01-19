import React from 'react';

import AnythingsList from '../Components/AnythingsList';

function AnythingsView({ ...rest }) {
  return (
    <div {...rest}>
      <h1>Anythings</h1>
      <br />
      <AnythingsList />
    </div>
  );
}

export default AnythingsView;
