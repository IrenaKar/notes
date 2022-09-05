import React from "react";
import ProfileForm from "./ProfileForm";
import styled from "styled-components";

const TodoProfileForm = styled.div`
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
  h1 {
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
    input,
    textarea {
      background-color: rgba(0, 0, 0, 0.7);
      color: lightGray;
      border-radius: 5px;
      border: none;
      margin-top: 8px;
      padding: 3px 10px;
    }
    input {
      height: 40px;
    }
  }

    button {
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
    button:hover {
      background: lightgray;
      transition: 1s ease-out;
    }
    .error {
      color: RGB(220, 56, 69);
    }
`;

export default function UserProfile() {
    return (
        <TodoProfileForm>
            <h1>Your User Profile</h1>
            <ProfileForm />
        </TodoProfileForm>
    );
}
