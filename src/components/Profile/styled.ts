import { styled } from '~/stitches';

export const Photo = styled('img', {
  objectFit: 'cover',
  objectPosition: 'center',
  borderRadius: '50%',
  margin: 0,
  width: 72,
  height: 72,
  '@tablet': {
    width: 96,
    height: 96,
  },
});

export const ProfileInfo = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  flex: 1,
  '& > strong': {
    fontSize: '1.2rem',
    '@tablet': {
      fontSize: '1.35rem',
    },
  },
});

export const IconLink = styled('a', {
  display: 'flex',
  alignItems: 'center',
  gap: '.25rem',
  fontWeight: '500',
  textDecoration: 'none',
  color: 'inherit',
  '&:hover': {
    textDecoration: 'underline',
  },
});

export const PhotoAndInfo = styled('div', {
  display: 'flex',
  alignItems: 'center',
  gap: '1.5rem',
  flex: 1,
});

export const ProfileSection = styled('section', {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'flex-start',
  gap: '2rem',
});

export const FollowersFollowing = styled('p', {
  display: 'flex',
  alignItems: 'center',
  gap: '.5rem',
  marginBottom: 0,
});

export const FollowersFollowingLink = styled(IconLink, {
  fontWeight: '400',
});

export const ConnectGitHub = styled('a', {
  display: 'flex',
  alignItems: 'center',
  color: '#fff',
  backgroundColor: '#333',
  paddingX: '1rem',
  paddingY: '.75rem',
  alignSelf: 'flex-start',
  borderRadius: '.5rem',
  gap: '.5rem',
  textDecoration: 'none',
  boxShadow: '0 0 2px 4px rgba(255 255 255 / .24)',
  transition: 'all .15s ease-in-out',
  fontWeight: '500',
  '&:hover, &:focus': {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#333',
    transform: 'translateY(-1px)',
  },
});
