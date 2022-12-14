import { styled } from '~/stitches';

export const RepositoriesGrid = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  gap: '1rem',
  '@tablet': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});
