import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth'
import { auth } from './firebase'

export const authService = {
  register: (email: string, password: string) =>
    createUserWithEmailAndPassword(auth, email, password),

  loginWithEmail: (email: string, password: string) =>
    signInWithEmailAndPassword(auth, email, password),

  loginWithGoogle: () => {
    const provider = new GoogleAuthProvider()
    return signInWithPopup(auth, provider)
  },

  logout: () => signOut(auth),

  onAuthStateChanged: (callback: (user: any) => void) =>
    auth.onAuthStateChanged(callback),
}
