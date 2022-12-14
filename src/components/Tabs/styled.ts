import { styled } from '~/stitches';

export const TabsContainer = styled('div', {
  marginY: '2rem',
});

export const TabList = styled('div', {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  border: '1px solid var(--nc-bg-3)',
  backgroundColor: 'var(--nc-bg-2)',
  borderBottomWidth: 0,
  borderTopLeftRadius: '.5rem',
  borderTopRightRadius: '.5rem',
  overflowX: 'auto',
  '& > *:first-child': {
    borderTopLeftRadius: '.5rem',
  },
  '& > *:last-child': {
    borderTopRightRadius: '.5rem',
  },
  '& > *:not(:last-child)': {
    borderRight: '1px solid var(--nc-bg-3)',
  },
});

export const Tab = styled('button', {
  backgroundColor: 'unset',
  width: '100%',
  minHeight: '48px',
  borderRadius: 0,
  color: 'var(--nc-tx-2)',
  '&[aria-selected="true"]': {
    color: 'var(--nc-tx-1)',
    borderBottom: '2px solid var(--nc-tx-2)',
    fontWeight: '600',
  },
  '&:hover': {
    backgroundColor: 'var(--nc-ac-1)',
  },
  '&:active, &:focus': {
    backgroundColor: 'unset',
  },
});

export const TabContent = styled('section', {
  border: '1px solid var(--nc-bg-3)',
  paddingX: '1rem',
  paddingY: '1.5rem',
  borderBottomLeftRadius: '.5rem',
  borderBottomRightRadius: '.5rem',
});
