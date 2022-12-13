import StitchesLogo from '@/components/StitchesLogo';
import { styled } from '~/stitches';
import { Auth } from '@/components/Auth';

const Box = styled('div', {});

const Text = styled('p', {
  fontFamily: '$system',
  color: '$hiContrast',
});

const Link = styled('a', {
  fontFamily: '$system',
  textDecoration: 'none',
  color: '$purple600',
});

const Container = styled('div', {
  marginX: 'auto',
  paddingX: '$3',

  variants: {
    size: {
      1: {
        maxWidth: '300px',
      },
      2: {
        maxWidth: '585px',
      },
      3: {
        maxWidth: '865px',
      },
    },
  },
});

export const LoginPage = () => {
  return (
    <Box css={{ paddingY: '$6' }}>
      <Container size={{ '@initial': '1', '@bp1': '2' }}>
        LOGIN
        <Auth />
      </Container>
    </Box>
  );
};
