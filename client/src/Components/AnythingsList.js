import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import FormattedDate from './FormattedDate';
import { getAnythings } from '../api-services';
import { DataText } from '../UIComponents';


function AnythingItem({ value: item }) {
  return (
    <tr>
      <td>
        <Link to={`/anythings/${item.id}`}>{item.type}</Link>
      </td>
      <DataText>{item.value1}</DataText>
      <DataText>{item.value2}</DataText>
      <td className="no-wrap"><FormattedDate value={item.createdAt} /></td>
    </tr>
  );
}

function AnythingsList({ ...rest }) {
  const { isLoading, data: { data: anythings = [] } = {} } = useQuery(
    'anythings',
    () => getAnythings({ sort_by: 'createdAt.desc', limit: 10 }),
  );

  if (isLoading) {
    return null;
  }
  return (
    <div {...rest}>
      <table className="u-full-width">
        <thead>
          <tr>
            <th>Type</th>
            <th>Value #1</th>
            <th>Value #2</th>
            <th>Created</th>
          </tr>
        </thead>
        <tbody>
          {anythings.map((anything) => (
            <AnythingItem key={`anything${anything.id}`} value={anything} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AnythingsList;
