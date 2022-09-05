import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import TodoRender from "../Todo/TodoList/TodoRender";
import styled from "styled-components";
import Context from "../../Store/Context";

const TodoWrapper = styled.div`
  h2 {
    color: lightGray;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 0;
    font-size: 30px;
  }

  .empty-state {
    color: white;
    font-size: 18px;
  }
  .add-button {
    background: white;
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    color: black;
    font-size: 14px;
    cursor: pointer;
    width: 150px;
    margin-top: 25px;
  }
  .add-button:hover {
    background: lightgray;
  }
  a {
    color: lightGray;
    font-weight: bold;
    font-size: 14px;
    padding-right: 5px;
    border-radius: 5px;
  }

  .home-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .login {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-top: 0;
    color: lightgray;
  }
`;

export default function StartingPage() {
  const { isLoggedIn} = useContext(Context);
  const navigate = useNavigate();

  const navigateToForm = () => {
    navigate("add-task");
  };

  return (
    <TodoWrapper>
      {isLoggedIn && (
        <>
          <TodoRender />{" "}
          <button className="add-button" onClick={navigateToForm}>
            Add new task
          </button>
        </>
      )}
      {!isLoggedIn && (
        <div className="home-content">
          <h2>Wellcome to your personal To Do list</h2>
          <div className="login">
            {" "}
            <Link to="/authentication">Login</Link>{" "}
            <p> and start creating awesome tasks</p>
          </div>
        </div>
      )}
    </TodoWrapper>
  );
}
