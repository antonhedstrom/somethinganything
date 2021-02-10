import React, { useState, useCallback } from 'react';
import styled from 'styled-components';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { Input } from '../UIComponents';
import { searchAll } from '../api-services';

const StyledInput = styled(Input)`
  box-sizing: border-box;
`;
const ResultsContainer = styled.div`
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  min-width: 400px;
  opacity: ${({ visible }) => visible ? 1 : 0};
  border: 1px ${({ theme }) => theme.colors.N30} solid;
  background-color: ${({ theme }) => theme.colors.N10};
  color: ${({ theme }) => theme.colors.N80};
`;
const SearchHitLink = styled(Link)`
  margin-right: ${({ theme }) => theme.spacing.small};
`;

const initialResults = {
  somethings: [],
  anythings: [],
  tags: [],
};

function SearchBar({ ...rest }) {
  const [term, setTerm] = useState('');
  const [results, setResults] = useState(initialResults);
  const queryClient = useQueryClient();
  const handleSearch = useCallback((event) => {
    setTerm(event.target.value);
  }, [setTerm]);
  const handleKeyPress = useCallback(async (event) => {
    console.log(event);
    if (event.charCode === 13) {
      if (term.length <= 2) {
        setResults(initialResults);
        return;
      }
      const {
        error,
        data = {},
      } = await queryClient.fetchQuery(['search', term], () => searchAll(term));
      setResults(data);
    }
  }, [queryClient, term]);

  const hasSomethings = results.somethings.length > 0;
  const hasAnythings = results.anythings.length > 0;
  const hasTags = results.tags.length > 0;

  return (
    <div {...rest}>
      <StyledInput
        value={term}
        onChange={handleSearch}
        placeholder="Sök"
        onKeyPress={handleKeyPress}
      />
      <br />

      <div style={{ position: 'relative' }}>
        <ResultsContainer visible={hasSomethings || hasAnythings || hasTags}>
          {hasSomethings && (
            <>
              <h5>Somethings</h5>
              {results.somethings.map((something) => (
                <SearchHitLink to={`/somethings/${something.id}`}>
                  {something.title}
                </SearchHitLink>
              ))}
            </>
          )}

          {hasAnythings && (
            <>
              <h5>Anythings</h5>
              {results.anythings.map((anything) => (
                <SearchHitLink to={`/anythings/${anything.id}`}>
                  {anything.title}
                </SearchHitLink>
              ))}
            </>
          )}

          {hasTags && (
            <>
              <h5>Tags</h5>
              {results.tags.map((tag) => (
                <SearchHitLink to={`/tags/${tag.id}`}>
                  {tag.title}
                </SearchHitLink>
              ))}
            </>
          )}
        </ResultsContainer>
      </div>

    </div>
  );
}

export default SearchBar;
