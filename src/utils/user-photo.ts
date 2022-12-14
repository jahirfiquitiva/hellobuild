export const getUserPhotoUrl = (
  username?: string,
  email?: string,
  firstName?: string,
): string => {
  if (username) return `https://unavatar.io/github/${username}`;
  return `https://unavatar.io/${email}?fallback=https://source.boringavatars.com/beam/96/${firstName}&square=true`;
};
