import { useFormik } from 'formik';
import toast from 'react-hot-toast';

import Yup from '@/lib/yup';
import { Form, FormRow, FormField, FieldError } from './../styled';
import { useAuth } from '@/providers';
import { toastConfig } from '@/lib/toast';
import { authErrorToMessage } from '@/utils/auth-error';
import { createUserInStore } from '@/utils/firestore-operations';

interface SignUpFormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

const signUpFormValidation = Yup.object({
  firstName: Yup.string()
    .max(15, 'Must be 15 characters or less')
    .required('This field is required'),
  lastName: Yup.string()
    .max(20, 'Must be 20 characters or less')
    .required('This field is required'),
  email: Yup.string()
    .email('Invalid email address')
    .required('This field is required'),
  password: Yup.string()
    .password()
    .min(8, 'Your password must be at least 8 characters long')
    .minUppercase(
      1,
      'Your password must include at least 1 uppercase character',
    )
    .minLowercase(
      1,
      'Your password must include at least 1 lowercase character',
    )
    .minNumbers(2, 'Your password must include at least 2 numbers')
    .minSymbols(2, 'Your password must include at least 2 special characters')
    .required('This field is required'),
});

export const SignUp = () => {
  const { signUp } = useAuth();
  const formik = useFormik<SignUpFormData>({
    initialValues: { firstName: '', lastName: '', email: '', password: '' },
    validationSchema: signUpFormValidation,
    onSubmit: async (values: SignUpFormData) => {
      toast.loading('Registering user', { ...toastConfig, id: 'auth' });
      signUp?.({
        email: values.email || '',
        password: values.password || '',
        data: { firstName: values.firstName, lastName: values.lastName },
      })
        .then((result) => {
          createUserInStore(
            result.user.uid,
            values.email,
            values.firstName,
            values.lastName,
          );
          toast.success('User registered!', { ...toastConfig, id: 'auth' });
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
      <FormRow>
        <FormField>
          <label htmlFor={'firstName'}>First Name</label>
          <input
            type={'text'}
            id={'firstName'}
            placeholder={'John'}
            {...formik.getFieldProps('firstName')}
          />
          {touched.firstName && errors.firstName ? (
            <FieldError>{errors.firstName}</FieldError>
          ) : null}
        </FormField>
        <FormField>
          <label htmlFor={'lastName'}>Last Name</label>
          <input
            type={'text'}
            id={'lastName'}
            placeholder={'Doe'}
            {...formik.getFieldProps('lastName')}
          />
          {touched.lastName && errors.lastName ? (
            <FieldError>{errors.lastName}</FieldError>
          ) : null}
        </FormField>
      </FormRow>

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
        Sign up
      </button>
    </Form>
  );
};
