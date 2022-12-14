import { styled } from '~/stitches';

export const RepositoriesGrid = styled('section', {
  display: 'grid',
  gridTemplateColumns: '1fr',
  '@tablet': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
});
