import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import FormattedDate from './FormattedDate';
import { getAnythings, removeAnything } from '../api-services';
import { DataText } from './StyledComponents';
import { Button } from '../UIComponents';


function AnythingItem({ value: item }) {
  const { mutate: deleteAnything, isLoading } = useMutation(removeAnything, {
    onSuccess: ({ data: removedItem }) => {
      const removedId = Number.parseInt(removedItem.id, 10);
      queryClient.setQueryData('anythings', (cachedQuery) => {
        return {
          ...cachedQuery,
          data: cachedQuery.data.filter((item) => item.id !== removedId),
        };
      });
    },
  });
  const queryClient = useQueryClient();
  const deleteItem = useCallback(() => {
    if (isLoading) {
      return;
    }
    deleteAnything(item.id);
  }, [deleteAnything, isLoading, item.id]);

  return (
    <tr>
      <td>
        <Link to={`/anythings/${item.id}`}>{item.id}</Link>
      </td>
      <td>
        <Link to={`/anythings/${item.id}`}>{item.type}</Link>
      </td>
      <DataText>{item.value1}</DataText>
      <DataText>{item.value2}</DataText>
      <td><FormattedDate value={item.createdAt} /></td>
      <td><Button className="danger u-pull-right" onClick={deleteItem}>Ta&nbsp;bort</Button></td>
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
            <th>#</th>
            <th>Type</th>
            <th>Value #1</th>
            <th>Value #2</th>
            <th>Created</th>
            <th></th>
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
