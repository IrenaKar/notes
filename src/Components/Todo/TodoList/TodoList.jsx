import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Context from "../../../Store/Context";

const TodoStyles = styled.tr`
  background-color: ${(props) =>
    props.completed ? `RGB(25, 135, 84, 0.2)` : ``};
  .fa-check-double {
    color: ${(props) => (props.completed ? `RGB(25, 135, 84)` : `lightGray`)};
  }
`;

export default function TodoList({ title, description, date, id, completed }) {
  const {setInitialValues,editing, openModal, completedHandler } =
    useContext(Context);
  const navigate = useNavigate();

  // date formating
  const dateObj = new Date(date);
  const month = dateObj.toLocaleString("en-US", { month: "short" });
  const day = dateObj.toLocaleString("en-US", { day: "2-digit" });
  const year = dateObj.getFullYear();

  const editHandler = (id) => {
    editing(id);
    console.log(id)
    setInitialValues({
      title: title,
      description: description,
      date: date
    });
    navigate("add-task");
  };

  return (
    <TodoStyles completed={completed}>
      <td className="date">
        {date === "" ? (
          "No due date"
        ) : (
          <>
            <span>{day}</span>
            <span>{month}</span>
            <span>{year}</span>
          </>
        )}
      </td>
      <td className="content title">{title}</td>
      <td className="content">{description}</td>

      <td className="buttons ">
        <button onClick={() => editHandler(id)}>
          <i className="fa-solid fa-pen-to-square"></i>
        </button>
        <button onClick={() => {
          openModal(id, title)
          navigate("/delete-task");
        }}>
          <i className="fa-solid fa-circle-minus"></i>
        </button>
        <button onClick={() => {completedHandler(id)}}>
          <i className="fa-solid fa-check-double"></i>
        </button>
      </td>
    </TodoStyles>
  );
}
