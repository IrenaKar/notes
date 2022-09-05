import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Context from "../../Store/Context";

const ModalWrapper = styled.div`
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  width: 300px;
  color: black;
  min-geight: 150px;
  background-color: white;
  border-radius: 5px;
  padding: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  .modal_buttons {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .button_back {
    color: black;
    background: none;
    border: none;
    font-weight: bold;
    cursor: pointer;
  }
  .button_confirm {
    background: none;
    color: RGB(25, 135, 84);
    border: none;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
  }
  .modal_inner {
    width: 80%;
  }
  .task_title {
    font-weight: bold;
  }
`;

export default function Modal() {
  const { initialValues, setInitialValues, id, deleteHandler } = useContext(Context);
  const navigate = useNavigate()

  const navigateHome = () => {
    navigate("/")
    setInitialValues({
      title: "",
      id: "",
    });
  }

  return (
    <ModalWrapper>
      <div className="modal_inner">
        <div>
          <p>Are you sure you want to delete <span className="task_title">"{initialValues.title}"</span> task?</p>
        </div>
        <div className="modal_buttons">
          <button className="button_back" onClick={navigateHome}>Cancel</button>
          <button className="button_confirm" onClick={() => {
            deleteHandler(id)
            navigate("/")
          }}>Confirm</button>
        </div>
      </div>
    </ModalWrapper>
  );
}
