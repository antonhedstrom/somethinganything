import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation } from 'react-query';

import ErrorContainer, { parseAxiosError } from '../Containers/Layout/ErrorContainer';
import AnythingAdd from '../Components/AnythingAdd';
import TagRelate from '../Components/TagRelate';
import { Tag, StyledDate, Spinner } from '../UIComponents';
import FormattedDate from './FormattedDate';
import { getSomething, updateSomething } from '../api-services';

function SomethingDetails({ id, ...rest }) {
  const { isLoading, refetch, error, data: { data: something } = {} } = useQuery(['something', id], () => getSomething(id));
  const { mutate: updateSomethingMutation } = useMutation(updateSomething, {
    onSuccess: ({ data: updatedItem }) => {
      refetch();
    },
  });

  const clearTagRelation = useCallback((tagId) => {
    updateSomethingMutation({ id, removeTags: [tagId] });
  }, [updateSomethingMutation, id]);

  const newTagRelation = useCallback((tag) => {
    updateSomethingMutation({ id, addTags: [tag.id] });
  }, [updateSomethingMutation, id]);

  if (isLoading) {
    return <Spinner style={{ width: '100%', height: '80px' }} />;
  }

  if (error) {
    return <ErrorContainer {...parseAxiosError(error)} />;
  }

  return (
    <div {...rest}>
      <h1>{something.title}</h1>

      <div className="mb-3">
        <StyledDate className="mr-3">
          <FormattedDate value={something.createdAt} />
        </StyledDate>
        {something.createdAt !== something.updatedAt && (
          <StyledDate>
            (<FormattedDate value={something.updatedAt} />)
          </StyledDate>
        )}
      </div>

      <h2 className="mt-3">Tags</h2>
      {something.tags.map((tag) => (
        <Link to={`/tags/${tag.id}`} key={`tag-${tag.id}`} className="mr-1 mb-1" style={{ display: 'inline-block' }}>
          <Tag
            color={tag.color}
            onDelete={() => clearTagRelation(tag.id)}
          >
            {tag.title}
          </Tag>
        </Link>
      ))}

      <TagRelate className="mt-2" onSelected={(tag) => newTagRelation(tag)} exclude={something.tags.map((tag) => tag.id)} />

      <h2 className="mt-3">Anythings</h2>
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
