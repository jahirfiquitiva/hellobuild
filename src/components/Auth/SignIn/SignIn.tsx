import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import Yup from '@/lib/yup';
import { Form, FormField, FieldError } from './../styled';
import { useAuth } from '@/providers';
import { toastConfig } from '@/utils/toast';
import { authErrorToMessage } from '@/utils/auth-error';
import { createUserInStore } from '@/utils/firestore-operations';

interface SignInFormData {
  email: string;
  password: string;
}

const signInFormValidation = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
  password: Yup.string()
    .min(8, 'Your password must be at least 8 characters long')
    .required('This field is required'),
});

export const SignIn = () => {
  const { signIn } = useAuth();
  const formik = useFormik<SignInFormData>({
    initialValues: { email: '', password: '' },
    validationSchema: signInFormValidation,
    onSubmit: async (values: SignInFormData) => {
      toast.loading('Validating data…', { ...toastConfig, id: 'auth' });
      await signIn?.({
        email: values.email || '',
        password: values.password || '',
      })
        .then((result) => {
          createUserInStore(result.user.uid, values.email || '');
          toast.success('Welcome back!', { ...toastConfig, id: 'auth' });
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
          {...formik.getFieldProps('email')}
        />
        {touched.email && errors.email ? (
          <FieldError>{errors.email}</FieldError>
        ) : null}
      </FormField>

      <FormField>
        <label htmlFor={'password'}>Password</label>
        <input
          id={'password'}
          type={'password'}
          {...formik.getFieldProps('password')}
        />
        {touched.password && errors.password ? (
          <FieldError>{errors.password}</FieldError>
        ) : null}
      </FormField>

      <button
        type={'button'}
        data-role={'submit'}
        onClick={() => {
          formik.submitForm();
        }}
      >
        Sign in
      </button>
    </Form>
  );
};
