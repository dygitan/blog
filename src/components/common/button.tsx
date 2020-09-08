type ButtonProps = {
  label: string;
  variant?: 'primary' | 'success' | 'link';
  onClick?: () => void;
};

export default function Button(props: ButtonProps) {
  return (
    <button
      type="button"
      className={`btn btn-${props.variant || 'primary'} text-decoration-none`}
      onClick={props.onClick}
    >
      {props.label}
    </button>
  );
}
