import { auth } from '@/firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { onAuthStateChanged, User } from 'firebase/auth';
import {
    createContext,
    ReactNode,
    useContext,
    useEffect,
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
  /** Firebase auth user — null if signed out, undefined while loading */
  firebaseUser: User | null | undefined;
  /** Cached Firestore profile stored in AsyncStorage */
  studentUser: StudentUser | null;
  /** True while the initial auth state is being resolved */
  isLoading: boolean;
  /** Call after login to cache the student profile locally */
  cacheStudentUser: (data: StudentUser) => Promise<void>;
  /** Clears local cache — call after sign-out */
  clearStudentUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue>({
  firebaseUser: undefined,
  studentUser: null,
  isLoading: true,
  cacheStudentUser: async () => {},
  clearStudentUser: async () => {},
});

export function AuthProvider({ children }: { children: ReactNode }) {
  const [firebaseUser, setFirebaseUser] = useState<User | null | undefined>(undefined);
  const [studentUser, setStudentUser] = useState<StudentUser | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load cached student profile from AsyncStorage immediately so we can
    // show the right screen even before the Firebase listener fires.
    AsyncStorage.getItem(STUDENT_USER_KEY).then((raw) => {
      if (raw) {
        try {
          setStudentUser(JSON.parse(raw));
        } catch {
          // corrupted data — ignore
        }
      }
    });

    // Firebase auth state listener — persisted across restarts thanks to
    // getReactNativePersistence configured in firebaseConfig.ts.
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setFirebaseUser(user);
      if (!user) {
        // Signed out — clear local cache
        setStudentUser(null);
        AsyncStorage.removeItem(STUDENT_USER_KEY);
      }
      setIsLoading(false);
    });

    return unsubscribe;
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
      value={{ firebaseUser, studentUser, isLoading, cacheStudentUser, clearStudentUser }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
