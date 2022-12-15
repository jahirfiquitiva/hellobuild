import type { ToastOptions } from 'react-hot-toast';

export const toastConfig: ToastOptions = {
  className: 'toast',
  style: {
    paddingLeft: '24px',
    gap: '.5rem',
    maxWidth: '364px',
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '& > div:firstChild': {
      fontSize: '1.35rem',
    },
  },
};
