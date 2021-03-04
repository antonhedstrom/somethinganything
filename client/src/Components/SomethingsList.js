import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { ThemeContext } from 'styled-components';
import { useQuery } from 'react-query';

import FormattedDate from './FormattedDate';
import { getSomethings } from '../api-services';
import { TagList, Tag, Badge } from '../UIComponents';

function SomethingItem({ value: item }) {
  const theme = useContext(ThemeContext);

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
