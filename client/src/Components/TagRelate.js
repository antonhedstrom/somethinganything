
import React, {
  useState,
  useCallback,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useQuery, useQueryClient, useMutation } from 'react-query';

import { getRandomColor } from '../constants';
import { Input, Button, Tag } from '../UIComponents';
import { createTag as createTagService, getTags } from '../api-services';

const Results = styled.div`
`;

const FormContainer = styled.div`
  max-width: 280px;
  display: flex;
  flex-direction: row;
`;

function TagRelateItem({ tag, onClick, ...rest }) {
  const handleOnClick = useCallback(() => onClick(tag), [onClick, tag]);
  return (
    <Tag
      size="small"
      color={tag.color}
      className="mr-1"
      onClick={handleOnClick}
      {...rest}
    >
      {tag.title}
    </Tag>
  );
}

function TagRelate({ onSelected, exclude, ...rest }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isValidTerm, setValidTerm] = useState(false);
  const [isCreateButtonDisabled, setDisableCreateButton] = useState(false);
  const [searchTags, setSearchResult] = useState([]);
  const queryClient = useQueryClient();

  const { mutate: createTag, isLoading: creatingTag } = useMutation(createTagService, {
    onSuccess: ({ data: newTag }) => {
      queryClient.setQueryData('tags', (cachedQuery = {}) => {
        const existingTags = cachedQuery.data || [];
        return {
          ...cachedQuery,
          data: [newTag, ...existingTags],
        };
      });
      setSearchTerm('');
      onSelected(newTag);
    },
  });

  // Keep track if we have a valid term
  useEffect(() => {
    setValidTerm(searchTerm.length > 2);
  }, [searchTerm]);

  // Do a new search if term changes
  useEffect(() => {
    if (!isValidTerm) {
      setSearchResult([]);
      return;
    }
    const timeoutId = setTimeout(() => {
      queryClient.fetchQuery(
        ['tags', 'search', searchTerm],
        () => getTags({ title: searchTerm }).then(({ data }) => setSearchResult(data))
      );
    }, 400);
    return () => clearTimeout(timeoutId);
  }, [queryClient, searchTerm, isValidTerm]);

  useEffect(() => {
    // Disable button if it already exists
    const lookupTag = searchTags.find((tag) => tag.title.toLowerCase() === searchTerm.toLowerCase());
    setDisableCreateButton(lookupTag);
  }, [searchTerm, searchTags]);

  const saveAsNewTag = useCallback(() => {
    if (creatingTag || isCreateButtonDisabled || !isValidTerm) {
      return;
    }
    createTag({
      title: searchTerm,
      color: getRandomColor(),
    });
    setSearchTerm('');
  }, [createTag, creatingTag, searchTerm, isCreateButtonDisabled, isValidTerm]);

  const handleOnChange = useCallback((event) => {
    setSearchTerm(event.target.value);
  }, [setSearchTerm]);

  const handleKeyEvent = useCallback((event) => {
    switch(event.keyCode) {
      case 13: // Enter
        saveAsNewTag();
        break;
      case 9: // Tab
        // TODO: Step through list of tags
        break;
      case 27: // Escape
        setSearchTerm('');
        event.target.blur();
        break;
      default:
        break;
    }
  }, [saveAsNewTag]);

  return (
    <div {...rest}>
      <FormContainer>
        <Input
          placeholder="Search/create tags..."
          size="small"
          value={searchTerm}
          onChange={handleOnChange}
          onKeyDown={handleKeyEvent}
          />
        <Button
          size="small"
          color="success"
          disabled={creatingTag || isCreateButtonDisabled}
          style={{ display: isValidTerm ? 'block' : 'none' }}
          onClick={saveAsNewTag}
        >
          Create
        </Button>
      </FormContainer>
      <Results className="mt-1">
        {searchTags
          .filter((tag) => !exclude.includes(tag.id))
          .map((suggestion, index) => (
            <Tag
              key={suggestion.id}
              size="small"
              color={suggestion.color}
              className="mr-1"
              onClick={() => onSelected(suggestion)}
            >
              {suggestion.title}
            </Tag>
          ))}
      </Results>
    </div>
  );
}

TagRelate.defaultProps = {
  exclude: [],
};

TagRelate.propTypes = {
  onSelected: PropTypes.func.isRequired,
  exclude: PropTypes.array,
};

export default TagRelate;
