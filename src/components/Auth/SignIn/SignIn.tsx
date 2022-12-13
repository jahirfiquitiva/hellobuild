import { useFormik } from 'formik';

import Yup from '@/lib/yup';
import { Form, FormField, FieldError } from './../styled';

interface SignInFormData {
  email?: string;
  password?: string;
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
  const formik = useFormik<SignInFormData>({
    initialValues: {},
    validationSchema: signInFormValidation,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
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
