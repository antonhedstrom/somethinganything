import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';

import FormattedDate from './FormattedDate';
import { getSomethings, removeSomething } from '../api-services';
import { Button, TagList, Tag, Badge } from '../UIComponents';

function SomethingItem({ value: item }) {
  const theme = useContext(ThemeContext);
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
      <td>
        <Link to={`/somethings/${item.id}`}>{item.title}</Link>
        <br/>
        {item.Tags.length > 0 && (
          <TagList>
            {item.Tags.slice(0, 5).map((tag) => (
              <Tag color={tag.color} size="small" key={`tag-${tag.id}`}>{tag.title}</Tag>
            ))}
          </TagList>
        )}
      </td>
      <td><FormattedDate value={item.createdAt} /></td>
      <td>
        {item.Anythings.length > 0 && <Badge color={theme.colors.N60}>{item.Anythings.length}</Badge>}
        <Button className="danger u-pull-right" onClick={deleteItem}>Ta&nbsp;bort</Button>
      </td>
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
