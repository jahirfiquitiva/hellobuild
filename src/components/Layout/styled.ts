import { Link } from 'react-router-dom';
import { styled } from '~/stitches';

export const Main = styled('main', {
  display: 'flex',
  flexDirection: 'column',
  height: '100%',
  flex: 1,
});

export const Header = styled('header', {});

export const Navigation = styled('nav', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem',
  '@tablet': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const NavLinksGroup = styled('ul', {
  display: 'flex',
  alignItems: 'center',
  gap: '1rem',
  listStyle: 'none',
  margin: 0,
  '& > li': {
    display: 'flex',
    margin: 0,
    height: '100%',
    minHeight: '42px',
    verticalAlign: 'middle',
    alignItems: 'center',
  },
});

export const NavLink = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  height: '100%',
  minHeight: '42px',
  padding: '.25rem .5rem',
});

export const ProfilePill = styled(Link, {
  display: 'flex',
  alignItems: 'center',
  border: '1px solid var(--nc-bg-3)',
  alignSelf: 'flex-start',
  padding: '.5rem .5rem',
  gap: '.5rem',
  borderRadius: 9999,
  color: 'inherit',
  textDecoration: 'none',
  transition: 'all .15s ease-in-out',
  '&:hover,&:focus': {
    color: 'inherit',
    textDecoration: 'none',
    borderColor: 'var(--nc-tx-2)',
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

export const Footer = styled('footer', {
  marginTop: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem',
  paddingTop: '1.5rem',
  paddingBottom: '.5rem',
  borderTop: '1px solid var(--nc-bg-3)',
  '@tablet': {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export const SignOutButton = styled('button', {
  color: 'var(--nc-bg-1)',
  backgroundColor: 'var(--nc-err)',
  '&:hover': {
    backgroundColor: 'var(--nc-err-2)',
  },
});
