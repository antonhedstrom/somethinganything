import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import FormattedDate from './FormattedDate';
import { getSomethings, removeSomething } from '../api-services';
import { Button } from '../UIComponents';

function SomethingItem({ value: item }) {
  const { mutate: deleteSomething, isLoading } = useMutation(removeSomething, {
    onSuccess: ({ data: removedItem }) => {
      const removedId = Number.parseInt(removedItem.id, 10);
      queryClient.setQueryData('somethings', (cachedQuery) => {
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
    deleteSomething(item.id);
  }, [deleteSomething, isLoading, item.id]);

  return (
    <tr>
      <td><Link to={`/somethings/${item.id}`}>{item.id}</Link></td>
      <td><Link to={`/somethings/${item.id}`}>{item.title}</Link></td>
      <td><FormattedDate value={item.createdAt} /></td>
      <td><Button className="danger u-pull-right" onClick={deleteItem}>Ta&nbsp;bort</Button></td>
    </tr>
  );
}

function SomethingsList({ ...rest }) {
  const { isLoading, data: { data: somethings = [] } = {} } = useQuery(
    'somethings',
    () => getSomethings({ sort_by: 'createdAt.desc', limit: 10 }),
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
            <th>Title</th>
            <th>Created</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {somethings.map((something) => (
            <SomethingItem key={`something-${something.id}`} value={something} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default SomethingsList;
