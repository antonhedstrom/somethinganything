import classnames from 'classnames';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: ${({ block }) => block ? '100%' : 'initial'};
`;

function Input({
  size,
  className,
  children,
  block,
  ...rest
}) {

  return (
    <StyledInput block={block} className={classnames('input', className, size, {
    })} {...rest}>
      {children}
    </StyledInput>
  );
}

Input.defaultProps = {
  size: '',
};

export default Input;
