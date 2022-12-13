import { styled } from '~/stitches';

export const Form = styled('form', {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  '& button[data-role="submit"]': {
    alignSelf: 'flex-end',
  },
});

export const FormRow = styled('div', {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'flex-start',
  gap: '1rem',
});

export const FormField = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  flex: 1,
  gap: '.35rem',
  '& input': {
    minHeight: '42px',
    margin: 0,
  },
  '& label': {
    fontWeight: '500',
  },
});

export const FieldError = styled('small', {
  color: 'var(--nc-err)',
  fontWeight: '500',
  margin: 0,
});
