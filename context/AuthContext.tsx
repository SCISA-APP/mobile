import { supabase } from '@/supabaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Session } from '@supabase/supabase-js';
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';

const STUDENT_USER_KEY = '@student_user';

interface StudentUser {
  uid: string;
  fullName: string;
  email: string | null;
  permission: string;
  program: string;
  year: number | string;
}

interface AuthContextValue {
  session: Session | null | undefined;
  studentUser: StudentUser | null;
  isLoading: boolean;
  isSigningUp: boolean;              // ← NEW: true while success modal is visible
  setIsSigningUp: (v: boolean) => void; // ← NEW
  cacheStudentUser: (data: StudentUser) => Promise<void>;
  clearStudentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  session: undefined,
  studentUser: null,
  isLoading: true,
  isSigningUp: false,
  setIsSigningUp: () => {},
  cacheStudentUser: async () => {},
  clearStudentUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null | undefined>(undefined);
  const [studentUser, setStudentUser] = useState<StudentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSigningUp, setIsSigningUp] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STUDENT_USER_KEY).then((raw) => {
      if (raw) {
        try {
          setStudentUser(JSON.parse(raw));
        } catch {
          // corrupted — ignore
        }
      }
    });

    supabase.auth.getSession().then(({ data }) => {
      console.log('RESTORED SESSION:', data.session);
      setSession(data.session);
      setIsLoading(false);
    });

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        setStudentUser(null);
        AsyncStorage.removeItem(STUDENT_USER_KEY);
      }
    });

    return () => listener.subscription.unsubscribe();
  }, []);

  const cacheStudentUser = async (data: StudentUser) => {
    setStudentUser(data);
    await AsyncStorage.setItem(STUDENT_USER_KEY, JSON.stringify(data));
  };

  const clearStudentUser = async () => {
    setStudentUser(null);
    await AsyncStorage.removeItem(STUDENT_USER_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        studentUser,
        isLoading,
        isSigningUp,
        setIsSigningUp,
        cacheStudentUser,
        clearStudentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}