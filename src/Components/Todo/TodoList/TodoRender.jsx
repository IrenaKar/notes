import React, { useContext, useState } from "react";
import TodoList from "./TodoList";
import styled from "styled-components";
import Context from "../../../Store/Context";
import Modal from "../../Modal/Modal";

const TodoTable = styled.div`
  display: flex;
  flex-direction: column;

  position: relative;
  width: 50%;
  margin-left: auto;
  margin-right: auto;
  h1 {
    color: lightgray;
  }
  table {
    color: lightGray;
    width: 100%;
    border-collapse: collapse;
    td,
    th {
      border: 1px solid rgb(128, 128, 128, 0.5);
    }
    td {
      padding: 0 20px;
    }
    th {
      padding: 10px 0;
    }
    span {
      display: block;
      text-align: right;
    }
    .date {
      border: 1px solid rgb(128, 128, 128, 0.5);
      border-radius: 5px;
      padding: 10px;
      width: 50px;
    }
  }
  .buttons {
    display: flex;
    flex-direction: column;
    height: 100px;
    justify-content: center;
    width: 30px;
  }

  button {
    background: none;
    color: lightGray;
    border: none;
    cursor: pointer;
    font-size: 16px;
  }
  .filters {
    margin: 5px 0 10px 0;
    display: flex;
    justify-content: space-between;
  }

  .fa-circle-minus:hover {
    color: RGB(220, 56, 69);
  }
  .fa-pen-to-square:hover {
    color: darkGray;
  }
  .fa-check-double:hover {
    color: RGB(25, 135, 84);
  }
  .action {
    width: 70px;
  }
  select {
    width: 150px;
    background: white;
    border: none;
    border-radius: 5px;
    padding: 2px 5px;
    cursor: pointer;
  }
`;
export default function TodoRender() {
  const { newValues, todos, getTodos, token } = useContext(Context);
  const [selected, setSelected] = useState("");

  const handleChange = (e) => {
    setSelected(e.target.value);
  };

  const filteredCompleted = todos.filter((todo) => {
    if (selected === "completed") {
      return todo.data.isCompleted === true;
    } else if (selected === "uncompleted") {
      return todo.data.isCompleted === false;
    } else {
      return todo;
    }
  });

  return (
    <TodoTable>
      {todos.length === 0 ? (
        <p className="empty-state">No tasks to show</p>
      ) : (
        <>
          <h1>Created tasks</h1>
          <div className="filters">
            <button onClick={() => getTodos()}>Refresh todos</button>
            <select name="filters" id="filters" onChange={handleChange}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Uncompleted</option>
            </select>
          </div>
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Title</th>
                <th>Description</th>
                <th className="action">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompleted.map((todo) => {
                if (token === todo.data.user) {
                 
                  return (
                    <TodoList
                      completed={todo.data.isCompleted}
                      key={todo.id}
                      newValues={newValues}
                      title={todo.data.title}
                      description={todo.data.description}
                      date={todo.data.date}
                      id={todo.id}
                      user={todo.data.user}
                    />
                  );
                }
              })}
            </tbody>
          </table>
        </>
      )}
    </TodoTable>
  );
}
