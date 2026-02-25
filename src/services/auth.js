import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  onAuthStateChanged
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { auth, db, googleProvider } from '../config/firebase';

/**
 * Sign up new user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @param {string} fullName - User's full name
 * @returns {Promise} Result object with success status and user data or error
 */
export const signUp = async (email, password, fullName) => {
  try {
    // Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Store additional user data in Firestore
    await setDoc(doc(db, 'users', user.uid), {
      fullName,
      email,
      createdAt: new Date().toISOString(),
      isPremium: false,
      savedRecipes: []
    });

    return { success: true, user };
  } catch (error) {
    console.error('Sign up error:', error);
    
    // User-friendly error messages
    let errorMessage = 'An error occurred during sign up';
    if (error.code === 'auth/email-already-in-use') {
      errorMessage = 'This email is already registered';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    } else if (error.code === 'auth/weak-password') {
      errorMessage = 'Password should be at least 6 characters';
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Sign in with Google popup
 * @returns {Promise} Result object with success status and user data or error
 */
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    // Check if user document exists in Firestore
    const userDoc = await getDoc(doc(db, 'users', user.uid));
    
    // If new user, create their document
    if (!userDoc.exists()) {
      await setDoc(doc(db, 'users', user.uid), {
        fullName: user.displayName,
        email: user.email,
        createdAt: new Date().toISOString(),
        isPremium: false,
        savedRecipes: []
      });
    }

    return { success: true, user };
  } catch (error) {
    console.error('Google sign in error:', error);
    
    let errorMessage = 'Failed to sign in with Google';
    if (error.code === 'auth/popup-closed-by-user') {
      errorMessage = 'Sign in was cancelled';
    } else if (error.code === 'auth/popup-blocked') {
      errorMessage = 'Popup was blocked by your browser';
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Sign in existing user with email and password
 * @param {string} email - User email
 * @param {string} password - User password
 * @returns {Promise} Result object with success status and user data or error
 */
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { success: true, user: userCredential.user };
  } catch (error) {
    console.error('Sign in error:', error);
    
    let errorMessage = 'Failed to sign in';
    if (error.code === 'auth/user-not-found') {
      errorMessage = 'No account found with this email';
    } else if (error.code === 'auth/wrong-password') {
      errorMessage = 'Incorrect password';
    } else if (error.code === 'auth/invalid-email') {
      errorMessage = 'Invalid email address';
    }
    
    return { success: false, error: errorMessage };
  }
};

/**
 * Sign out current user
 * @returns {Promise} Result object with success status or error
 */
export const logOut = async () => {
  try {
    await signOut(auth);
    return { success: true };
  } catch (error) {
    console.error('Sign out error:', error);
    return { success: false, error: 'Failed to sign out' };
  }
};

/**
 * Listen to authentication state changes
 * @param {Function} callback - Function to call when auth state changes
 * @returns {Function} Unsubscribe function
 */
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export default {
  signUp,
  signInWithGoogle,
  signIn,
  logOut,
  onAuthChange
};
