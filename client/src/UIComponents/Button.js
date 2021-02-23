import classnames from 'classnames';

function Button({
  size,
  color,
  outline,
  className,
  children,
  ...rest
}) {

  return (
    <button className={classnames('button', className, {
      // Size
      'btn-large': size === 'large',
      'btn-small': size === 'small',
      // Color
      'brand': color === 'brand',
      'accent': color === 'accent',
      'success': color === 'success',
      'information': color === 'information',
      'warning': color === 'warning',
      'danger': color === 'danger',
      // Plain/outline
      'plain': outline,
    })} {...rest}>
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: '',
  color: '',
  outline: false,
};

export default Button;
