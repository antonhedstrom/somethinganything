import classnames from 'classnames';

function Button({
  size,
  className,
  children,
  ...rest
}) {

  return (
    <button className={classnames('button', className, {
      'btn-large': size === 'large',
      'btn-small': size === 'small',
    })} {...rest}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: '',
};

export default Button;
