import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Context from "../../../Store/Context";
import styled from "styled-components";

const TodoForm = styled.div`
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
  .buttons {
    display: flex;
    justify-content: space-between;
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
  }
  .error {
    color: RGB(220, 56, 69);
  }
`;

export default function Form() {
  const {
    initialValues,
    setInitialValues,
    submitTodoHandler,
    editTodoHandler,
    isEditing
  } = useContext(Context);
  const navigate = useNavigate();

  const setValuesHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInitialValues({ ...initialValues, [name]: value });
    setError("");
  };

  const [error, setError] = useState("");
  const validate = (e) => {
    e.preventDefault();
    setError("Title is required");
  };

  const back = () => {
    navigate("/");
    setInitialValues({
      title: "",
      description: "",
      id: "",
      date: ""
    });
  };

  return (
    <TodoForm>
      <form
        className="form"
        onSubmit={(e) => {
          !initialValues.title && validate(e);
          isEditing ? editTodoHandler(e) : submitTodoHandler(e);
          initialValues.title && navigate("/");
        }}
      >
        <fieldset>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            type="text"
            value={initialValues.title}
            onChange={setValuesHandler}
            placeholder="enter task title"
            name="title"
          />
          <span className="error">{error}</span>
        </fieldset>
        <fieldset>
          <label htmlFor="descr">Description (optional)</label>
          <textarea
            cols="40"
            rows="5"
            id="descr"
            type="text"
            value={initialValues.description}
            onChange={setValuesHandler}
            placeholder="Enter short description"
            name="description"
          />
        </fieldset>
        <fieldset>
          <label htmlFor="date">Pick a date (optional)</label>{" "}
          <input
            value={initialValues.date}
            type="date"
            min={new Date()}
            onChange={setValuesHandler}
            placeholder="Pick a date"
            name="date"
            id="date"
            dateFormat="d MMM yyyy"
          />
          {/* <input id="date" type="date" value={initialValues.date} onChange={setValuesHandler} placeholder="Pick a date" name="date" /> */}
        </fieldset>
        <div className="buttons">
          <button onClick={back} type="submit">
            Cancel
          </button>
          <button type="submit">Done</button>
        </div>
      </form>
    </TodoForm>
  );
}
