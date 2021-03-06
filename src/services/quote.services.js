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

const quoteCollection = collection(db, "quoteTb");
const quoteQuery = query(quoteCollection, orderBy("date", "desc"));

class quoteDataService {
  findQuote = async (quote, citation) => {
    const existedQuote = query(quoteCollection, where("quote", "==", quote), where("citation", "==", citation));
    const data = await getDocs(existedQuote);
    const q = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
    return q;
  };

  addQuote = (newQuote) => {
    return addDoc(quoteCollection, newQuote);
  };
  getAllQuotes = () => {
    return getDocs(quoteQuery);
  };
  deleteQuote = (id) => {
    const quoteDoc = doc(db, "quoteTb", id);
    return deleteDoc(quoteDoc);
  };
}

export default new quoteDataService();