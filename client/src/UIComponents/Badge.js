import styled, { css } from 'styled-components';

import { getFontColor } from '../constants';

const StyledBadgeList = styled.div`
  display: inline-flex;
  flex-direction: row;
  flex-wrap: wrap;
  gap: 4px;
  align-items: center;
`;

const StyledBadge = styled.div`
  display: inline;
  border-radius: 2px;
  background-color: ${({ theme, color }) => color || theme.colors.N60};
  color: ${({ theme, color }) => getFontColor(color || theme.colors.N60)};
  padding: 0.3em 0.9em;
  ${({ size }) => {
    switch (size) {
      case 'small':
        return css`
          font-size: 9px;
        `;
      case 'large':
        return css`
          font-size: 15px;
        `;
      case 'medium':
      default:
        return css`
          font-size: 12px;
        `;
    }
  }};
`;

export function BadgeList({ children }) {
  return (
    <StyledBadgeList>
      {children}
    </StyledBadgeList>
  );
}

function Badge({
  size,
  color,
  children,
  ...rest
}) {
  return (
    <StyledBadge
      size={size}
      color={color}
      {...rest}
    >
      {children}
    </StyledBadge>
  );
}

export default Badge;
