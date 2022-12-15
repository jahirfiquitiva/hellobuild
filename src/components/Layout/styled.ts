import { Link } from 'react-router-dom';
import { styled } from '~/stitches';

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
});

export const Header = styled('header', {});

export const Navigation = styled('nav', {});

export const Footer = styled('footer', {});

export const ProfilePill = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid var(--nc-bg-3)',
  alignSelf: 'flex-start',
  padding: '.25rem .5rem',
  gap: '.5rem',
  borderRadius: 9999,
  color: 'inherit',
  textDecoration: 'none',
  '&:hover,&:focus': {
    color: 'inherit',
    textDecoration: 'none',
  },
  '& > *': {
    margin: 0,
  },
});

export const ProfilePhoto = styled('img', {
  width: 32,
  height: 32,
  borderRadius: '50%',
  objectFit: 'cover',
  objectPosition: 'center',
});
