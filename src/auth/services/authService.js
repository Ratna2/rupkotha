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
    isVerified: false,
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

  // 🔥 Reload to get latest verification state
  await userCredential.user.reload();

  if (!userCredential.user.emailVerified) {
    throw new Error("Please verify your email before login.");
  }

  // ✅ Update Firestore verification status if verified
  const userRef = doc(db, "users", userCredential.user.uid);

  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    await updateDoc(userRef, {
      isVerified: true
    });
  }

  return userCredential;
};



// 🔥 GOOGLE LOGIN (UPGRADED FOR LIVE DOMAIN)
export const googleLogin = async () => {
  try {

    const result = await signInWithPopup(auth, googleProvider);
    const user = result.user;

    const userRef = doc(db, "users", user.uid);
    const userSnap = await getDoc(userRef);

    // ✅ If user doesn't exist create new Firestore profile
    if (!userSnap.exists()) {

      const firstName = user.displayName?.split(" ")[0] || "";
      const lastName = user.displayName?.split(" ")[1] || "";

      await setDoc(userRef, {
        uid: user.uid,
        firstName: firstName,
        lastName: lastName,
        username: user.displayName || "",
        phone: user.phoneNumber || "",
        email: user.email,
        role: "customer",
        isVerified: true,
        createdAt: new Date()
      });

    }

    return result;

  } catch (error) {

    console.error("Google Login Error:", error);

    // Ignore popup close
    if (error.code === "auth/popup-closed-by-user") {
      throw error;
    }

    // Popup blocked
    if (error.code === "auth/popup-blocked") {
      throw new Error("Popup blocked. Please allow popups.");
    }

    // Unauthorized domain
    if (error.code === "auth/unauthorized-domain") {
      throw new Error("Domain not authorized for Google login.");
    }

    throw new Error("Google login failed.");
  }
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