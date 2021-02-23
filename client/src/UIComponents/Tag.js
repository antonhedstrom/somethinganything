import { useCallback } from 'react';
import {
  StyledTagList,
  StyledTag,
  DeleteButton,
} from './Tag.styles';

export function TagList({ children }) {
  return (
    <StyledTagList>
      {children}
    </StyledTagList>
  );
}

function Tag({
  size,
  color,
  onDelete,
  children,
  ...rest
}) {
  const handleOnDelete = useCallback((event) => {
    event.stopPropagation();
    event.preventDefault();
    onDelete();
  }, [onDelete]);
  return (
    <StyledTag
      size={size}
      color={color}
      {...rest}
    >
      {children}
      {onDelete && (
        <DeleteButton onClick={handleOnDelete}>
          {'\u2716'}
        </DeleteButton>
      )}
    </StyledTag>
  );
}

export default Tag;
