import { styled } from '~/stitches';

export const Photo = styled('img', {
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '50%',
});

export const ConnectGitHub = styled('a', {
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  backgroundColor: '#333',
  paddingX: '.75rem',
  paddingY: '.5rem',
  alignSelf: 'flex-start',
  borderRadius: '.25rem',
  gap: '.5rem',
  textDecoration: 'none',
  boxShadow: '0 1px 2px 3px rgba(255 255 255 / .12)',
  transition: 'all .15s ease-in-out',
  fontWeight: '500',
  '&:hover, &:focus': {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#333',
    transform: 'translateY(-1px)'
  },
});
