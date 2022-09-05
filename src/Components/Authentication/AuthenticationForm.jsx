import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Context from "../../Store/Context";
import styled from "styled-components";
import { addDoc } from "firebase/firestore";
import { usersCollectionRef } from "../../Firebase/firestore.collections";

const TodoAuth = styled.div`
  margin: 20px;
  .form {
    display: flex;
    flex-direction: column;
    width: 50%;
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    @media (max-width: 768px) {
      width: 100%;
    }
  }
  .buttons {
    display: flex;
    justify-content: center;
    margin-top: 20px;
  }
  h2 {
    color: lightGray;
  }
  fieldset {
    border: none;
    text-align: left;
    display: flex;
    flex-direction: column;
    padding-left: 0;
    padding-right: 0;
    label {
      color: white;
      font-size: 16px;
    }
    input {
      background-color: rgba(0, 0, 0, 0.7);
      color: lightGray;
      border-radius: 5px;
      border: none;
      margin-top: 8px;
      height: 40px;
      padding: 3px 10px;
    }
  }
  .auth {
    background: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    color: black;
    font-size: 14px;
    cursor: pointer;
    width: 150px;
    margin-right: 10px;
  }
  .auth:hover {
    background: lightgray;
  }

  .switch-auth {
    background: none;
    border: none;
    color: lightgray;
    font-size: 14px;
    text-decoration: underline;
    cursor: pointer;
  }
  .error {
    color: RGB(220, 56, 69);
  }
`;

export default function AuthenticationForm() {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const nameInputRef = useRef();
  const surnameInputRef = useRef();

  const { login } = useContext(Context);

  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(false);
  const [message, setMessage] = useState("");

  // getUsers

  // useEffect(() => {
  //   getUsers();
  // }, []);

  // useEffect(() => {
  //   console.log(users);
  // }, [users]);

  // function getUsers() {
  //   getDocs(usersCollectionRef)
  //     .then((response) => {
  //       console.log(response.docs);
  //       const user = response.docs.map((doc) => ({
  //         data: doc.data(),
  //         id: doc.id
  //       }));
  //       setUsers(user);
  //     })
  //     .catch((error) => console.log(error));
  // }

  const submitUsers = (e) => {
    const email = emailInputRef.current.value;
    const firstName = nameInputRef.current.value;
    const lastName = surnameInputRef.current.value;

    e.preventDefault();
    addDoc(usersCollectionRef, {
      email: email,
      name: firstName,
      surname: lastName,
    })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };


  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  const loginHandler = (token) => {
    login(token);
  };



  const submitHandler = (e) => {
    e.preventDefault();
    const email = emailInputRef.current.value;
    const password = passwordInputRef.current.value;

    setIsLoading(true);
    let url;
    if (isLogin) {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAeKhmTsTae6lK1e2efI_xKsxbmwZbRdOQ"; //signIn firebase URL
    } else {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyAeKhmTsTae6lK1e2efI_xKsxbmwZbRdOQ"; //signUp firebase URL
    }
    fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then((res) => {
        setIsLoading(false);
        if (res.ok) {
          return res.json();
        } else {
          return res.json().then((data) => {
            // let errorMessage = data.error.message;
            setErrorMessage(data.error.message);
            throw new Error(errorMessage);
          });
        }
      })
      .then((data) => {
        loginHandler(data.email);
        navigate("/", { replace: true });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    switch (errorMessage) {
      case "EMAIL_NOT_FOUND":
        setMessage("The email doesn't exist");
        break;
      case "INVALID_PASSWORD":
        setMessage("Invalid password");
        break;
      case "EMAIL_EXISTS":
        setMessage("This email already exist");
        break;
      case "WEAK_PASSWORD : Password should be at least 6 characters":
        setMessage("Password should be at least 6 characters");
        break;
      default:
    }
  }, [errorMessage]);

  console.log(errorMessage);
  console.log(message);
  return (
    <TodoAuth>
      <h2>{isLogin ? "Login" : "Sign Up"}</h2>
      <form
        onSubmit={(e) => {
          submitHandler(e);
          submitUsers(e)
        }}
        className="form"
      >
        {isLogin ? (
          <>
            <fieldset>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                ref={emailInputRef}
                placeholder="type your email"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
                placeholder="type your password"
              />
              <span className="error">{message}</span>
            </fieldset>
          </>
        ) : (
          <>
            <fieldset>
              <label htmlFor="name">Your FIrst Name</label>
              <input
                type="text"
                id="name"
                required
                ref={nameInputRef}
                placeholder="type your first name"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="surname">Your Last Name</label>
              <input
                type="text"
                id="surname"
                required
                ref={surnameInputRef}
                placeholder="type your last name"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="email">Your Email</label>
              <input
                type="email"
                id="email"
                required
                ref={emailInputRef}
                placeholder="type your email"
              />
            </fieldset>
            <fieldset>
              <label htmlFor="password">Your Password</label>
              <input
                type="password"
                id="password"
                required
                ref={passwordInputRef}
                placeholder="type your password"
              />
              <span className="error">{message}</span>
            </fieldset>
          </>
        )}
        <div className="buttons">
          {!isLoading && (
            <button className="auth">{isLogin ? "Login" : "Sign up"}</button>
          )}
          {isLoading && <p>Loading...</p>}
          <button
            className="switch-auth"
            type="button"
            onClick={switchAuthModeHandler}
          >
            {isLogin ? "Create new account" : "Login with existing"}
          </button>
        </div>
      </form>
    </TodoAuth>
  );
}
