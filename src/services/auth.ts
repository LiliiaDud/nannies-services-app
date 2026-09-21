import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  onAuthStateChanged,
} from 'firebase/auth';
import type { User } from 'firebase/auth';
import { auth } from '../firebase';

// Реєстрація нового користувача
export const registerUser = async (name: string, email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  // Додаємо ім'я користувача до профілю Firebase
  await updateProfile(userCredential.user, { displayName: name });
  return userCredential.user;
};

// Логін існуючого користувача
export const loginUser = async (email: string, password: string) => {
  const userCredential = await signInWithEmailAndPassword(auth, email, password);
  return userCredential.user;
};

// Вихід з системи
export const logoutUser = async () => {
  await signOut(auth);
};

// Спостерігач за зміною стану авторизації
export const subscribeAuth = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};
