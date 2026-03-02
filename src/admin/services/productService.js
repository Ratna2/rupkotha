import { db } from "../../firebase/index";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
} from "firebase/firestore";

const productsRef = collection(db, "products");

// CREATE
export const addProduct = async (data) => {
  await addDoc(productsRef, {
    ...data,
    createdAt: serverTimestamp(),
  });
};

// READ
export const getProducts = async () => {
  const snapshot = await getDocs(productsRef);
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

// UPDATE
export const updateProduct = async (id, data) => {
  const ref = doc(db, "products", id);
  await updateDoc(ref, data);
};

// DELETE
export const deleteProduct = async (id) => {
  const ref = doc(db, "products", id);
  await deleteDoc(ref);
};