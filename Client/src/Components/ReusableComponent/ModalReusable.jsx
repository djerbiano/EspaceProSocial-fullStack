import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

const ModalContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
  background-color: #f2f2f2;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
`;

const ModalContent = styled.div`
  width: 80%;
  min-height: 80%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  position: relative;
  border: 1px solid black;
`;

const ModalCloseButton = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  text-align: right;
  font-size: 24px;
  cursor: pointer;
  color: red;
  &:hover {
    scale: 1.5;
    transition: 0.5s;
  }
`;

const ModalMessageContainer = styled.div`
width: 80%;
min-height: 200px;
margin-top: 50px;
padding: 20px;
`;

const ModalTitle = styled.div`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
`;

const ModalMessage = styled.div`
  text-align: center;
  font-size: 18px;
  font-weight: bold;
`;

export default function ModalReusable(props) {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState(false);

  const closeModal = () => {
    setShowModal(false);
    window.location.reload();
  };
  useEffect(() => {
    if (props.title) {
      setTitle(true);
      setShowModal(true);
    } else if (props.message) {
      setTitle(false);
      setShowModal(true);
    }
    //eslint-disable-next-line
  }, []);

  return (
    showModal && (
      <ModalContainer>
        <ModalContent>
          <ModalCloseButton>
            <AiOutlineClose onClick={closeModal} />
          </ModalCloseButton>
          <ModalMessageContainer>
          {title && <ModalTitle>{props.title}</ModalTitle>}
          <ModalMessage>{props.message}</ModalMessage>
          </ModalMessageContainer>
        </ModalContent>
      </ModalContainer>
    )
  );
}
