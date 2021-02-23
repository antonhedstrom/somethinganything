import React from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import { getTags } from '../api-services';
import { TagList, Tag } from '../UIComponents';

function TagsList({ ...rest }) {
  const { isLoading, data: { data: tags } = {} } = useQuery(
    'tags',
    () => getTags({ sort_by: 'createdAt.desc', limit: 40 }),
  );

  if (isLoading) {
    return null;
  }
  return (
    <TagList {...rest}>
      {tags.map((tag) => (
        <Link key={`tag${tag.id}`} to={`/tags/${tag.id}`} className="no-text-decoration">
          <Tag color={tag.color}>
            {tag.title}
          </Tag>
        </Link>
      ))}
    </TagList>
  );
}

export default TagsList;
