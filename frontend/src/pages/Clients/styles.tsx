import styled from "styled-components";

export const Container = styled.div`
  align-items: center;
  justify-content: center;
  height: 100vh;
  gap: 20px;
`;

export const ContainerModal = styled.div`
  input {
    width: 20vh;
    margin-top: 7px;
  }
  select {
    width: 20vh;
    height: 30px;
    margin-top: 7px;
  }
  button {
    cursor: pointer;
    border: none;
    width: 25vh;
    max-width: 30vh;
    margin-top: 10px;
    margin-bottom: 10px;
    color: #ffffff;
    font-family: Signika;
    line-height: 28px;
    letter-spacing: 0.05em;
    text-align: center;
    background: #1e90ff;
    border-radius: 50px;
  }
  .modal {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    overflow: auto;
    background-color: rgba(0, 0, 0, 0.5);
  }
  .modal-content {
    margin: 10% auto;
    width: 40vh;
    box-shadow: 0 5px 8px 0 rgba(0, 0, 0, 0.2), 0 7px 20px 0 rgba(0, 0, 0, 0.17);
    animation-name: modalopen;
    animation-duration: var(--modal-duration);
  }
  .modal-header h2 {
    margin: 0;
  }
  .modal-header {
    .close {
      color: #ccc;
      float: right;
      font-size: 30px;
      color: #fff;
    }
    .close:hover,
    .close:focus {
      color: #000;
      text-decoration: none;
      cursor: pointer;
    }
    background: #1e90ff;
    padding: 8.5px;
    color: #fff;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
  }
  .modal-body {
    padding: 10px 20px;
    background: #fff;
  }
  .trocar {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
`;

export const Title = styled.h2``;
