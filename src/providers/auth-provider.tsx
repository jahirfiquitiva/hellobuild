import {
  createContext,
  useContext,
  useState,
  useEffect,
  type FC,
  type ReactNode,
} from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type UserCredential,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

import { auth } from '@/lib/firebase';
import { Loading } from '@/components/Loading';
import { createUserInStore } from '@/utils/firestore-operations';
import { useFirestoreUser, type UserData } from '@/hooks/useFirestoreUser';
import { toastConfig } from '@/utils/toast';

interface AccountInfo {
  email: string;
  password?: string;
  data?: {
    firstName?: string;
    lastName?: string;
  };
}

interface AuthProviderFields {
  signUp?: (accountInfo: AccountInfo) => Promise<UserCredential>;
  signIn?: (accountInfo: AccountInfo) => Promise<UserCredential>;
  signOut?: () => void;
  resetPassword?: (email: string) => Promise<void>;
  loading?: boolean;
  user?: UserData | null;
}

const AuthContext = createContext<AuthProviderFields>({});

export const AuthProvider: FC<{ children?: ReactNode | ReactNode[] | null }> = (
  props,
) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [userId, setUserId] = useState<string | undefined>(undefined);
  const userData = useFirestoreUser(userId);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      setLoading(false);
      if (userAuth) {
        toast.dismiss('auth');
        setUserId(userAuth.uid);
        createUserInStore(userAuth.uid, userAuth.email || '');
        const { pathname } = window.location;
        navigate(pathname || '/profile');
      } else {
        setUserId(undefined);
        const { pathname } = window.location;
        // Only redirect to home page when in these sites which require authentication
        if (pathname.endsWith('profile') || pathname.endsWith('favorites')) {
          toast.error('Authentication required', {
            ...toastConfig,
            id: 'auth',
          });
          navigate('/');
        }
      }
    });
    return unsubscribe;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value: AuthProviderFields = {
    signUp: (accountInfo: AccountInfo) => {
      return createUserWithEmailAndPassword(
        auth,
        accountInfo.email,
        accountInfo.password || '',
      );
    },
    signIn: (accountInfo: AccountInfo) => {
      return signInWithEmailAndPassword(
        auth,
        accountInfo.email,
        accountInfo.password || '',
      );
    },
    signOut: () => {
      signOut(auth);
      setUserId(undefined);
      sessionStorage.removeItem('gh_token');
      navigate('/');
    },
    resetPassword: (email: string) => {
      return sendPasswordResetEmail(auth, email);
    },
    user: userData,
    loading,
  };

  if (loading) return <Loading />;
  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
};

export const useAuth = (): AuthProviderFields => {
  return useContext(AuthContext);
};
