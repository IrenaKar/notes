import { collection } from "firebase/firestore";
import { db } from "./index";

export const todosCollectionRef = collection(db, 'todos')
export const usersCollectionRef = collection(db, 'users')