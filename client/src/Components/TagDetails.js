import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { TagTile } from './StyledComponents';
import ErrorContainer, { parseAxiosError } from '../Containers/Layout/ErrorContainer';
import { getTag } from '../api-services';

function TagDetails({ id, ...rest }) {
  const { isLoading, error, data: { data: tag = {} } = {} } = useQuery(['tag', id], () => getTag(id));

  if (isLoading) {
    return null;
  }

  if (error) {
    return <ErrorContainer {...parseAxiosError(error)} />;
  }

  return (
    <div {...rest}>
      <Link style={{ float: 'right' }} to={`/tags/${tag.id}/edit`}>Edit</Link>
      <h3>{tag.title}</h3>
      <TagTile color={tag.color}>
        {tag.color}
      </TagTile>

      <br />
      <br />
      <h4>Somethings</h4>
      <br />
      <ul>
        {tag.somethings.map((something) => (
          <li key={`tag-something-${something.id}`}>
            <Link to={`/somethings/${something.id}`}>
              {something.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TagDetails;
