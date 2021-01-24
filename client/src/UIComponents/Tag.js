import styled, { css } from 'styled-components';

import { getFontColor } from '../constants';

const StyledTagList = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;
  align-items: center;
`;

const StyledTag = styled.div`
  border-radius: 5px;
  background-color: ${({ theme, color }) => color || theme.color.N60};
  color: ${({ theme, color }) => getFontColor(color || theme.color.N60)};
  ${({ size }) => {
    switch(size) {
      case 'small':
        return css`
          font-size: 10px;
          padding: 5px 10px;
        `;
      case 'large':
        return css`
          font-size: 16px;
          padding: 10px 20px;
        `;
      case 'medium':
      default:
        return css`
          font-size: 14px;
          padding: 8px 14px;
        `;
    }
  }};
`;

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
  children,
  ...rest
}) {
  return (
    <StyledTag
      size={size}
      color={color}
      {...rest}
    >
      {children}
    </StyledTag>
  );
}

export default Tag;
