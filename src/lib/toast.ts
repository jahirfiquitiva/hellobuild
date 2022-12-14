import type { ToastOptions } from 'react-hot-toast';

export const toastConfig: ToastOptions = {
  position: 'bottom-center',
  style: {
    border: '1px solid var(--nc-bg-3)',
    backgroundColor: 'var(--nc-bg-2)',
    color: 'var(--nc-tx-2)',
    paddingLeft: '24px',
    gap: '.5rem',
    maxWidth: '364px',
    backdropFilter: 'blur(8px)',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '& > div:first-child': {
      fontSize: '1.35rem',
    },
  },
};
