import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';

import ErrorContainer, { parseAxiosError } from '../Containers/Layout/ErrorContainer';
import AnythingAdd from '../Components/AnythingAdd';
import TagRelate from '../Components/TagRelate';
import { Button, StyledDate, Spinner, Tag } from '../UIComponents';
import FormattedDate from './FormattedDate';
import { getSomething, updateSomething, removeSomething } from '../api-services';

function SomethingDetails({ id, ...rest }) {
  const {
    isLoading,
    refetch,
    error,
    data: { data: something = {} } = {},
  } = useQuery(['something', id], () => getSomething(id));

  const { mutate: updateSomethingMutation } = useMutation(updateSomething, {
    onSuccess: ({ data: updatedItem }) => {
      refetch();
    },
  });
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutate: deleteSomething, isLoading: isDeleting } = useMutation(removeSomething, {
    onSuccess: ({ data: removedItem }) => {
      const removedId = Number.parseInt(removedItem.id, 10);
      queryClient.setQueryData('somethings', (cachedQuery) => {
        return {
          ...cachedQuery,
          data: cachedQuery.data.filter((item) => item.id !== removedId),
        };
      });
      history.goBack();
    },
  });

  const clearTagRelation = useCallback((tagId) => {
    updateSomethingMutation({ id, removeTags: [tagId] });
  }, [updateSomethingMutation, id]);

  const newTagRelation = useCallback((tag) => {
    updateSomethingMutation({ id, addTags: [tag.id] });
  }, [updateSomethingMutation, id]);

  const deleteItem = useCallback(() => {
    if (isLoading) {
      return;
    }
    deleteSomething(something.id);
  }, [deleteSomething, isLoading, something.id]);


  if (isLoading) {
    return <Spinner style={{ width: '100%', height: '80px' }} />;
  }

  if (error) {
    return <ErrorContainer {...parseAxiosError(error)} />;
  }


  return (
    <div {...rest}>
      <Button
        className="danger u-pull-right"
        disabled={isDeleting}
        onClick={deleteItem}
      >
        Ta&nbsp;bort
      </Button>

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
      {something.Tags.map((tag) => (
        <Link to={`/tags/${tag.id}`} key={`tag-${tag.id}`} className="mr-1 mb-1" style={{ display: 'inline-block' }}>
          <Tag
            color={tag.color}
            onDelete={() => clearTagRelation(tag.id)}
          >
            {tag.title}
          </Tag>
        </Link>
      ))}

      <TagRelate className="mt-2" onSelected={(tag) => newTagRelation(tag)} exclude={something.Tags.map((tag) => tag.id)} />

      <h2 className="mt-3">Anythings</h2>
      <AnythingAdd somethingId={something.id} onComplete={refetch} />
      {something.Anythings.map((anything) => (
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
