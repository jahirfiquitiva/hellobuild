import { type FC, type ReactNode, type ComponentProps, useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import { FormField } from '../styled';
import { InputAndButton } from './styled';

type PasswordInputProps = Omit<ComponentProps<'input'>, 'type'>;

interface PasswordFieldProps extends PasswordInputProps {
  children?: ReactNode | ReactNode[] | null;
}

export const PasswordField: FC<PasswordFieldProps> = (props) => {
  const { children, ...inputProps } = props;
  const [passwordVisible, setPasswordVisible] = useState(false);
  const buttonTitle = `${passwordVisible ? 'Hide' : 'Show'} password`;
  return (
    <FormField>
      <label htmlFor={'password'}>Password</label>
      <InputAndButton>
        <input
          id={'password'}
          type={passwordVisible ? 'text' : 'password'}
          {...inputProps}
        />
        <button
          title={buttonTitle}
          aria-label={buttonTitle}
          type={'button'}
          onClick={() => {
            setPasswordVisible(!passwordVisible);
          }}
        >
          {passwordVisible ? <EyeOff /> : <Eye />}
        </button>
      </InputAndButton>
      {children}
    </FormField>
  );
};
