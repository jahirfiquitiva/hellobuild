import { styled } from '~/stitches';

export const InputAndButton = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '.25rem',
  '& > input': {
    flex: 1,
    fontFamily: 'monospace'
  },
  '& > button': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 0,
    backgroundColor: 'unset',
    height: '100%',
    minWidth: '42px',
    border: '1px solid var(--nc-bg-3)',
    '&:hover, &:focus': {
      backgroundColor: 'var(--nc-bg-2)',
    },
  },
});
