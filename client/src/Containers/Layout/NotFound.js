import React from "react";
import { useLocation } from "react-router-dom";

import ErrorContainer from "./ErrorContainer";

function NotFound({ ...rest }) {
  let location = useLocation();
  return (
    <div {...rest}>
      <ErrorContainer
        name="404: Route not found"
        message={`
          ${location.pathname}
          ${location.search}
          ${location.hash}
        `}
      />
    </div>
  );
}

NotFound.defaultProps = {
  className: '',
};

export default NotFound;
