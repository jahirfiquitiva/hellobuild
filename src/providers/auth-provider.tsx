import { createContext, useContext, useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  type UserCredential,
} from 'firebase/auth';

import { auth } from '@/lib/firebase';
import { FC } from '@/types/fc';
import { useNavigate } from 'react-router-dom';
import { Loading } from '@/components/Loading';
import toast from 'react-hot-toast';
import { useGitHubAuth } from '@/hooks/useGitHubAuth';

interface AccountInfo {
  uid?: string;
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
  signOut?: () => Promise<void>;
  loading?: boolean;
  user?: AccountInfo | null;
}

const AuthContext = createContext<AuthProviderFields>({});

export const AuthProvider: FC = (props) => {
  const { children } = props;
  const githubToken = useGitHubAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<AccountInfo | null>(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      setLoading(false);
      if (userAuth) {
        toast.dismiss('auth');
        const user: Omit<AccountInfo, 'password'> = {
          uid: userAuth.uid,
          email: userAuth.email || '',
        };
        setUser(user);
        navigate('/profile');
      } else {
        setUser(null);
        navigate('/');
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
      return signOut(auth);
    },
    user,
    loading,
  };

  if (loading) return <Loading />;
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthProviderFields => {
  return useContext(AuthContext);
};
