import React from 'react';

import TagAdd from '../Components/TagAdd';
import TagsList from '../Components/TagsList';

function TagsView({ ...rest }) {
  return (
    <div {...rest}>
      <h1>Tags</h1>
      <TagAdd/>
      <br/>
      <TagsList />
    </div>
  );
}

export default TagsView;
