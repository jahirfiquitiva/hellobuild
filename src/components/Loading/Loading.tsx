import { Ring } from '@uiball/loaders';
import { LoadingContainer } from './styled';

export const Loading = () => {
  return (
    <LoadingContainer>
      <Ring size={40} lineWeight={5} speed={2} color={'var(--nc-lk-1)'} />
      <p>Loading…</p>
    </LoadingContainer>
  );
};
