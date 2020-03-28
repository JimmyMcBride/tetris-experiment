import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { startGame } from "../../store";

const StartGameModal = () => {
  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(startGame());
  };

  return (
    <Container>
      <Modal>
        <button onClick={handleClick}>Begin</button>
      </Modal>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  width: 100%;
  height: 100vh;
  background-color: rgb(0, 0, 0, 0.75);
`;

const Modal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 100px;
  background-color: #c0c0c0;
  border: 2px solid black;
  button {
    font-size: 2rem;
  }
`;

export default StartGameModal;
