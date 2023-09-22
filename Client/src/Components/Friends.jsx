import styled from "styled-components";
import logo from "../Assets/trump.jpg";
const ContainerFriends = styled.div`
  width: 100%;
  height: 100%;
  padding: 20px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  border-radius: 5px;
`;

const Friend = styled.div`
  width: 200px;
  height: 50px;
  background-color: #d1cbcb52;
  padding: 10px;
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    scale: 1.02;
  }

  & img {
    width: 15%;
    aspect-ratio: 1/1;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 10px;
  }

  & p {
    max-width: 100%;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

function Friends() {
  return (
    <ContainerFriends>
      <Friend>
        <img src={logo} alt="" />
        <p>UserName</p>
      </Friend>
      <Friend>
        <img src={logo} alt="" />
        <p>UserNameeeeeeeeeeeeeeeeee</p>
      </Friend>
    </ContainerFriends>
  );
}

export default Friends;
