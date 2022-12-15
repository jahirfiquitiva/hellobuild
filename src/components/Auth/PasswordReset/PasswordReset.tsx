import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import Yup from '@/lib/yup';
import { Form, FormField, FieldError } from '../styled';
import { useAuth } from '@/providers';
import { toastConfig } from '@/utils/toast';
import { authErrorToMessage } from '@/utils/auth-error';

interface SignInFormData {
  email: string;
}

const signInFormValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
});

export const PasswordReset = () => {
  const { resetPassword } = useAuth();
  const formik = useFormik<SignInFormData>({
    initialValues: { email: '' },
    validationSchema: signInFormValidation,
    onSubmit: async (values: SignInFormData) => {
      toast.loading('Sending email…', { ...toastConfig, id: 'auth' });
      await resetPassword?.(values.email || '')
        .then(() => {
          toast.success('Email sent! Check your inbox', {
            ...toastConfig,
            id: 'auth',
          });
        })
        .catch((error) => {
          toast.error(authErrorToMessage(error.code), {
            ...toastConfig,
            id: 'auth',
          });
        });
    },
  });
  const { touched, errors } = formik;

  return (
    <Form>
      <FormField>
        <label htmlFor={'email'}>Email</label>
        <input
          id={'email'}
          placeholder={'john.doe@email.com'}
          type={'email'}
          disabled={formik.isSubmitting}
          {...formik.getFieldProps('email')}
        />
        {touched.email && errors.email ? (
          <FieldError>{errors.email}</FieldError>
        ) : null}
      </FormField>
      <small>
        If there&apos;s an account registered with this email, you will receive
        a message with the steps to reset your password.
      </small>

      <button
        type={'button'}
        data-role={'submit'}
        disabled={formik.isSubmitting}
        onClick={() => {
          formik.submitForm();
        }}
      >
        Reset
      </button>
    </Form>
  );
};
