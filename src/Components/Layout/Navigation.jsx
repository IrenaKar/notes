import React from "react";
import { useContext } from "react";
// import {Context} from '../../Store/Context'
import { Link, useNavigate } from "react-router-dom";
import Context from "../../Store/Context";
import styled from "styled-components";

const Navbar = styled.header`
  height: 80px;
  border-bottom: 1px solid rgb(128, 128, 128, 0.5);
  nav {
    width: 100%;
  }
  .wrapper {
    height: 100%;
    margin: 0 20px;
    display: flex;
    flex-direction: row;
    justify-content: end;
    align-items: center;
  }
  a {
    text-decoration: none;
    color: white;
    font-weight: bold;
    font-size: 18px;
    margin-right: 10px;
  }
  ul {
    list-style-type: none;
    display: flex;
    justify-content: end;
    padding-left: 0;
    li {
      margin-left: 10px;
    }
  }

  .logout {
    background: none;
    color: gray;
    border: none;
    border-radius: 5px;
    font-size: 18px;
    padding-left: 20px;
    padding-right: 20px;
  }
  .logout:hover {
    background-color: rgb(128, 128, 128, 0.5);
    color: white;
    transition: 1s ease-out;
    cursor: pointer;
  }

  .name {
    color: lightGray;
    font-weight: bold;
    color: lightGray;
    font-weight: bold;
    font-size: 18px;
  }
`;

export default function Navigation() {
  const { isLoggedIn, logout, users, token } = useContext(Context);
  const navigate = useNavigate();

  const logoutHandler = () => {
    logout();
    navigate("/authentication");
  };

  console.log("navigation", users);
  console.log("navigation", token);

  return (
    <Navbar>
      <div className="wrapper">
      <nav>
      <ul>
        {isLoggedIn && (
          <Link to="/">
            <div className="tasks">My tasks</div>
          </Link>
        )}

  
            {!isLoggedIn && (
              <li>
                <Link to="/">Home</Link>
              </li>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="/authentication">Login</Link>
              </li>
            )}
            {isLoggedIn && (
              <li className="profile">
                <Link to="/profile">Profile</Link>
              </li>
            )}
            {users.map((user) => {
              if (token === user.data.email) {
                return <li className="name">Hi {user.data.name}</li>;
              }
            })}
            {isLoggedIn && (
              <li>
                <button className="logout" onClick={logoutHandler}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
      </div>
    </Navbar>
  );
}
