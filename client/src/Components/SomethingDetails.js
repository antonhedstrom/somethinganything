import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';

import ErrorContainer, { parseAxiosError } from '../Containers/Layout/ErrorContainer';
import AnythingAdd from '../Components/AnythingAdd';
import { Tag } from '../UIComponents';
import FormattedDate from './FormattedDate';
import { getSomething } from '../api-services';

const StyledDate = styled.div`
  color: ${({ theme }) => theme.colors.N60};
`;

function SomethingDetails({ id, ...rest }) {
  const { isLoading, refetch, error, data: { data: something } = {} } = useQuery(['something', id], () => getSomething(id));

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
          <Tag color={tag.color}>
            {tag.title}
          </Tag>
        </Link>
      ))}

      <br />
      <h2>Related Anythings</h2>
      <AnythingAdd somethingId={something.id} onComplete={refetch} />
      {something.anythings.map((anything) => (
        <div className="row" key={`something-anything-${anything.id}`}>
          <div className="three columns">
            <i>{anything.type}</i>
          </div>
          <div className="seven columns">
            {anything.value1}
            <br/>
            {anything.value2}
          </div>
          <div className="two columns">
            <Link to={`/anythings/${anything.id}`}>View</Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default SomethingDetails;
