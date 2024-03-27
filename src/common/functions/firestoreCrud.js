import { db } from "../../firebase";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore/lite";

export const readFirestore = async (table) => {
  const col = collection(db, table);
  const snap = await getDocs(col);
  const list = snap.docs.map((doc) => {
    return {
      data: doc.data(),
      id: doc._key.path.segments[6],
    };
  });
  return list;
};

export const addFirestoreDoc = async (table, obj) => {
  try {
    const docRef = await addDoc(collection(db, table), obj);
    return docRef.id;
  } catch (e) {
    return e;
  }
};

export const deleteFirestoreDoc = async (table, document) => {
  await deleteDoc(doc(db, table, document));
  return "Deleted document";
};
