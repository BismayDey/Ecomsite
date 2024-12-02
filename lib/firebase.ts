import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getFirestore, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyDXBxLXx0o9PzuJcgIefByJ2pp2ArjeriU",
  authDomain: "spotify-9d272.firebaseapp.com",
  projectId: "spotify-9d272",
  storageBucket: "spotify-9d272.firebasestorage.app",
  messagingSenderId: "146091699607",
  appId: "1:146091699607:web:7cf393a42416900afa68d2",
  measurementId: "G-2YTY27T8QJ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;
const googleProvider = new GoogleAuthProvider();

export interface UserProfile {
  username: string;
  email: string;
  chorCoins: number;
  subscriptionPlan: 'none' | 'basic' | 'plus';
  subscriptionEndDate: string | null;
}

export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  const userRef = doc(db, 'users', userId);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    return userSnap.data() as UserProfile;
  }
  return null;
};

export const updateUserProfile = async (userId: string, data: Partial<UserProfile>) => {
  const userRef = doc(db, 'users', userId);
  await updateDoc(userRef, data);
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;
    const userRef = doc(db, 'users', user.uid);
    const userSnap = await getDoc(userRef);
    
    if (!userSnap.exists()) {
      await setDoc(userRef, {
        username: user.displayName,
        email: user.email,
        chorCoins: 0,
        subscriptionPlan: 'none',
        subscriptionEndDate: null,
      });
    }
    
    return user;
  } catch (error) {
    console.error("Error signing in with Google", error);
    throw error;
  }
};

export { app, auth, db, analytics };

