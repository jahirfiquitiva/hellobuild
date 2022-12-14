import { styled } from '~/stitches';

export const RepositoryCard = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  gap: '.5rem',
  padding: '.5rem .5rem 1rem 1rem',
  border: '1px solid var(--nc-bg-3)',
  borderRadius: '.5rem',
  color: 'inherit',
  textDecoration: 'none',
  transition: 'all .25s ease-in-out',
});

export const RepositoryLink = styled('a', {
  flex: 1,
  color: 'inherit',
  textDecoration: 'none',
  transition: 'all .25s ease-in-out',
  '&:hover': {
    color: 'inherit',
    '& strong': {
      color: 'var(--nc-lk-1)',
      textDecoration: 'underline',
    },
  },
});

export const RepositoryHeader = styled('div', {
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '.5rem',
});

export const RepositoryTitle = styled('strong', {
  fontWeight: '500',
  fontSize: '.875rem',
  '@tablet': {
    fontSize: '.9rem',
  },
});

export const RepositoryVisibility = styled('span', {
  fontSize: '.75rem',
  padding: '.1rem .35rem',
  borderRadius: 99999,
  border: '1px solid var(--nc-bg-3)',
});

export const RepositoryDescription = styled('small', {
  display: '-webkit-box',
  '-webkit-line-clamp': '3',
  '-webkit-box-orient': 'vertical',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  flex: '1',
  paddingRight: '.5rem',
});

export const RepositoryStat = styled('small', {
  display: 'flex',
  alignItems: 'center',
  gap: '.35rem',
  '& > span': {
    lineHeight: 1,
  },
});

export const RepositoryLanguageIcon = styled('span', {
  display: 'block',
  width: 12,
  height: 12,
  borderRadius: '50%',
  userSelect: 'none',
  pointerEvents: 'none',
});

export const FavoriteButton = styled('button', {
  minHeight: 36,
  height: 36,
  width: 36,
  padding: 0,
  alignSelf: 'flex-end',
  backgroundColor: 'unset',
  '&:hover,&:focus,&:active': {
    backgroundColor: 'unset',
  },
  '& > svg': {
    opacity: '.75',
  },
});
