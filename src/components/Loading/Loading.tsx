import { Ring, LineWobble } from '@uiball/loaders';
import { FC } from 'react';
import { LoadingContainer, LoadingText } from './styled';

interface LoadingProps {
  text?: string;
  useLine?: boolean;
}

export const Loading: FC<LoadingProps> = (props) => {
  const { text, useLine } = props;
  return (
    <LoadingContainer
      css={
        useLine
          ? {
              flexDirection: 'column-reverse',
              alignSelf: 'flex-start',
              gap: '1rem',
              alignItems: 'flex-start'
            }
          : {}
      }
    >
      {useLine ? (
        <LineWobble
          size={120}
          lineWeight={5}
          speed={1.75}
          color={'var(--nc-lk-1)'}
        />
      ) : (
        <Ring size={40} lineWeight={5} speed={2} color={'var(--nc-lk-1)'} />
      )}
      <LoadingText>{text || 'Loading…'}</LoadingText>
    </LoadingContainer>
  );
};
