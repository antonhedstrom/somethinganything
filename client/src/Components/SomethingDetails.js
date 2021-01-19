import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import ErrorContainer, { parseAxiosError } from '../Containers/Layout/ErrorContainer';
import AnythingAdd from '../Components/AnythingAdd';
import { TagTile } from './StyledComponents';
import FormattedDate from './FormattedDate';
import { getSomething } from '../api-services';

const StyledDate = styled.div`
  color: ${({ theme }) => theme.color.N60};
`;

function SomethingDetails({ id, ...rest }) {
  const { isLoading, error, data: { data: something } = {} } = useQuery(['something', id], () => getSomething(id));

  if (isLoading) {
    return null;
  }

  if (error) {
    return <ErrorContainer {...parseAxiosError(error)} />;
  }

  return (
    <div {...rest}>
      <h1>{something.title}</h1>
      <StyledDate>
        <FormattedDate value={something.createdAt} />
        &nbsp;
        (<FormattedDate value={something.updatedAt} />)
      </StyledDate>

      {something.tags.map((tag) => (
        <Link to={`/tags/${tag.id}`} key={`tag-${tag.id}`} >
          <TagTile color={tag.color}>
            {tag.title}
          </TagTile>
        </Link>
      ))}

      <br />
      <h2>Related Anythings</h2>
      <AnythingAdd somethingId={something.id} />
      {something.anythings.map((anything) => (
        <div className="row" key={`something-anything-${anything.id}`}>
          <div className="three columns">
            {anything.type}
          </div>
          <div className="nine columns">
            {anything.value1}
            {anything.value2}
          </div>
        </div>
      ))}
    </div>
  );
}

export default SomethingDetails;
