import { Search } from 'lucide-react';
import { styled } from '~/stitches';

export const RepositoriesGrid = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  '@tablet': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});

export const RepositoriesSearchContainer = styled('div', {
  position: 'relative',
  width: '100%',
  marginTop: '1rem',
});

export const RepositoriesSearchLabel = styled('label', {
  display: 'none',
  visibility: 'hidden',
});

export const RepositoriesSearch = styled('input', {
  width: '100%',
  minHeight: '48px',
  paddingRight: '36px',
});

export const RepositoriesSearchIcon = styled(Search, {
  position: 'absolute',
  top: 0,
  right: 0,
  transform: 'translateY(50%)',
  marginRight: '12px',
  pointerEvents: 'none',
  opacity: 0.75,
});
