const authErrorCodes = [
  'user-not-found',
  'wrong-password',
  'too-many-requests',
] as const;

type AuthErrorCode = typeof authErrorCodes[number];

type AuthError = `auth/${AuthErrorCode}` | string;

export const authErrorToMessage = (error: AuthError) => {
  if (error === 'auth/user-not-found') return 'User not found';
  if (error === 'auth/wrong-password') return 'Password is not correct';
  if (error === 'auth/too-many-requests') return 'Please try again in a minute';
  return error.toString();
};
