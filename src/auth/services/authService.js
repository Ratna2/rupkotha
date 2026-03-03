import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  sendEmailVerification,
  sendPasswordResetEmail
} from "firebase/auth";

import {
  doc,
  setDoc,
  getDoc,
  updateDoc
} from "firebase/firestore";

import { auth, db } from "../../firebase";

const googleProvider = new GoogleAuthProvider();


// 🔥 REGISTER USER
export const registerUser = async (data) => {
  const res = await createUserWithEmailAndPassword(
    auth,
    data.email,
    data.password
  );

  // ✅ Send Email Verification
  await sendEmailVerification(res.user);

  // ✅ Save user in Firestore with role
  await setDoc(doc(db, "users", res.user.uid), {
    uid: res.user.uid,
    firstName: data.firstName,
    lastName: data.lastName,
    username: data.username,
    phone: data.phone,
    email: data.email,
    role: "customer",
    isVerified: false, // will update after verification
    createdAt: new Date()
  });

  return res.user;
};



// 🔥 LOGIN USER (Block if not verified)
export const loginUser = async (email, password) => {
  const userCredential = await signInWithEmailAndPassword(
    auth,
    email,
    password
  );

  // 🔥 IMPORTANT: Reload to get latest verification state
  await userCredential.user.reload();

  if (!userCredential.user.emailVerified) {
    throw new Error("Please verify your email before login.");
  }

  // ✅ Update Firestore verification status if verified
  const userRef = doc(db, "users", userCredential.user.uid);
  await updateDoc(userRef, {
    isVerified: true
  });

  return userCredential;
};



// 🔥 GOOGLE LOGIN
export const googleLogin = async () => {
  const result = await signInWithPopup(auth, googleProvider);
  const user = result.user;

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) {
    await setDoc(userRef, {
      uid: user.uid,
      firstName: user.displayName?.split(" ")[0] || "",
      lastName: user.displayName?.split(" ")[1] || "",
      username: user.displayName || "",
      phone: user.phoneNumber || "",
      email: user.email,
      role: "customer",
      isVerified: true, // Google accounts are verified
      createdAt: new Date()
    });
  }

  return result;
};



// 🔥 FORGOT PASSWORD
export const forgotPassword = async (email) => {
  return await sendPasswordResetEmail(auth, email);
};



// 🔥 RESEND VERIFICATION EMAIL
export const resendVerificationEmail = async () => {
  if (!auth.currentUser) {
    throw new Error("No user logged in.");
  }

  await sendEmailVerification(auth.currentUser);
};