import React from 'react';
import styled from 'styled-components';

const Container = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
`;

function Spinner({ size, color, thickness, ...rest }) {
  return (
    <Container {...rest}>
      {/* https://reactjsexample.com/a-flashy-material-design-inspired-spinner-using-purely-css/ */}
      <div
        className="react-spinner-material"
        style={{
          width: size,
          height: size,
          borderColor: color,
          borderWidth: thickness,
        }}
      />
    </Container>
  );
}

Spinner.defaultProps = {
  color: '#CCC',
  thickness: '4px',
  size: '4rem',
};

export default Spinner;
