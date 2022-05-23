import { db } from "../firebase-config";
import {
  query,
  where,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  orderBy
} from "firebase/firestore";

const bookCollection = collection(db, "bookTb");
const q = query(bookCollection, orderBy("date", "desc"));

class bookDataService {
  findBook = async (title, author) => {
    const existedBook = query(bookCollection, where("title", "==", title), where("author", "==", author));
    const data = await getDocs(existedBook);
    const bk = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return bk;
  };

  addBook = (newBook) => {
    return addDoc(bookCollection, newBook);
  };
  getAllBooks = () => {
    return getDocs(q);
  };
  deleteBook = (id) => {
    const bookDoc = doc(db, "bookTb", id);
    return deleteDoc(bookDoc);
  };
}

export default new bookDataService();