import firebase from 'firebase/app';
import 'firebase/auth';

const registerUser = newUser => firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password);

const loginUser = newUser => firebase.auth().signInWithEmailAndPassword(newUser.email, newUser.password);

const logoutUser = () => firebase.auth().signOut();

const getCurrentUid = () => firebase.auth().currentUser.uid;

export default {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUid,
};
