import React, { createContext, useEffect, useState } from "react";
import { addDoc, deleteDoc, getDocs } from "firebase/firestore";
import { todosCollectionRef } from "../Firebase/firestore.collections";
import { usersCollectionRef } from "../Firebase/firestore.collections";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../Firebase";
import { runTransaction } from "firebase/firestore";

const Context = createContext({});

export const Provider = (props) => {
  const initialToken = localStorage.getItem("token"); //token from firebase by default expires for one hour
  const newValues = JSON.parse(localStorage.getItem("todo"));

  const [token, setToken] = useState(initialToken);
  const [isEditing, setIsEditing] = useState(false);
  const [open, setOpen] = useState(false);
  const [todos, setTodos] = useState([]);
  const [values, setValues] = useState([]);
  const [users, setUsers] = useState([]);
  const [id, setId] = useState("");

  // get users
  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    console.log(users);
  }, [users]);

  function getUsers() {
    getDocs(usersCollectionRef)
      .then((response) => {
        console.log(response.docs);
        const user = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id
        }));
        setUsers(user);
      })
      .catch((error) => console.log(error));
  }


  // get todos
  useEffect(() => {
    getTodos();
  }, []);

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  function getTodos() {
    getDocs(todosCollectionRef)
      .then((response) => {
        console.log(response.docs);
        const todoes = response.docs.map((doc) => ({
          data: doc.data(),
          id: doc.id
        }));
        setTodos(todoes);
      })
      .catch((error) => console.log(error));
  }

  const [initialValues, setInitialValues] = useState({
    title: "",
    description: "",
    date: "",
    id: "",
    isCompleted: false
  });

  const userIsLoggedIn = !!token; // !! converts value to a boolean true or false

  const loginHandler = (token) => {
    setToken(token);
    localStorage.setItem("token", token);
  };

  const logoutHandler = () => {
    setToken(null);
    localStorage.removeItem("token");
  };

  const editing = (id) => {
    setIsEditing(true);
    setId(id);
  };

  const submitTodoHandler = (e) => {
    e.preventDefault();
    addDoc(todosCollectionRef, {
      title: initialValues.title,
      description: initialValues.description,
      date: initialValues.date,
      isCompleted: false,
      user: token
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
    setInitialValues({
      title: "",
      description: "",
      id: "",
      date: ""
    });
  };

  const editTodoHandler = (e) => {
    e.preventDefault();
    const docRef = doc(db, "todos", id);
    updateDoc(docRef, {
      title: initialValues.title,
      description: initialValues.description,
      date: initialValues.date
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
    setInitialValues({
      title: "",
      description: "",
      id: "",
      date: ""
    });
  };

  async function completedHandler(id) {
    try {
      const docRef = doc(db, "todos", id);
      await runTransaction(db, async (transaction) => {
        const todoDoc = await transaction.get(docRef);
        if (!todoDoc.exists()) {
          throw "Document does not exist!";
        }

        const newValue = !todoDoc.data().isCompleted;
        transaction.update(docRef, { isCompleted: newValue });
      });
      console.log("Transaction successfully committed!");
    } catch (e) {
      console.log("Transaction failed: ", e);
    }
  }

  console.log(todos);

  const deleteHandler = (id) => {
    const docRef = doc(db, "todos", id);
    deleteDoc(docRef)
      .then(() => {
        console.log("deleted");
      })
      .catch((error) => console.log(error.message));
    setInitialValues({
      title: "",
      description: "",
      id: "",
      date: ""
    });
  };

  console.log(id);

  const openModal = (id, title) => {
    setId(id);
    setInitialValues({
      title: title,
      id: id
    });
    setOpen(true);
  };

  const contextValue = {
    token: token,
    isLoggedIn: userIsLoggedIn,
    setToken: setToken,
    login: loginHandler,
    logout: logoutHandler,
    setValues: setValues,
    values: values,
    setInitialValues: setInitialValues,
    initialValues: initialValues,
    editing: editing,
    isEditing: isEditing,
    submitTodoHandler: submitTodoHandler,
    newValues: newValues,
    setOpen: setOpen,
    open: open,
    todos: todos,
    getTodos: getTodos,
    id: id,
    deleteHandler: deleteHandler,
    editTodoHandler: editTodoHandler,
    openModal: openModal,
    completedHandler: completedHandler,
    users: users,
  };

  return (
    <Context.Provider value={contextValue}>{props.children}</Context.Provider>
  );
};

export default Context;
