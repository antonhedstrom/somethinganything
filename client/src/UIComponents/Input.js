import classnames from 'classnames';

function Input({
  size,
  className,
  children,
  ...rest
}) {

  return (
    <input className={classnames('input', className, size, {
    })} {...rest}>
      {children}
    </input>
  );
}

Input.defaultProps = {
  size: '',
};

export default Input;
