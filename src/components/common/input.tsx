import { useState } from 'react';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';

type CommonInputProps = {
  id?: string;
  label?: string;
  name?: string;
  onChange?: (e) => void;
  onKeyUp?: (e) => void;
  placeholder?: string;
  value?: string | number;
};

interface TextAreaProps extends CommonInputProps {
  rows?: number;
}

interface TextFieldProps extends CommonInputProps {
  type?: 'email' | 'password' | 'text';
}

interface InputProps extends CommonInputProps {
  type: 'email' | 'password' | 'text' | 'textarea';
}

export const TextArea = (props: TextAreaProps) => {
  return <Input {...props} type="textarea" />;
};

export const TextField = (props: TextFieldProps) => {
  return <Input {...props} type={props.type} />;
};

function Input(props: InputProps) {
  const { label, ...inputProps } = { className: 'form-control', ...props };

  const switchView = () => {
    switch (props.type) {
      case 'textarea':
        return <textarea {...inputProps} />;
      case 'password':
        return (() => {
          const [showPassword, setShowPassword] = useState(false);
          return (
            <div className="input-group">
              <input {...inputProps} type={showPassword ? 'text' : 'password'} />
              {props.type === 'password' && (
                <button
                  className="input-group-text"
                  style={{ outline: 'none' }}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
                </button>
              )}
            </div>
          );
        })();
      default:
        return <input {...inputProps} />;
    }
  };

  return (
    <div>
      {props.label && (
        <label htmlFor={props.name} className="form-label">
          {props.label}
        </label>
      )}
      {switchView()}
    </div>
  );
}
