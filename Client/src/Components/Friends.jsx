import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LogoVerifiyProfile from "./ReusableComponent/VerifyProfile";
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
  const navigate = useNavigate();
  //friends list
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    // Get friends list

    fetch(
      `http://localhost:3000/api/friends/${sessionStorage.getItem("userId")}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          token: sessionStorage.getItem("token"),
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        setFriends(data.friendsList);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const viewProfile = (id) => {
    navigate(`/singleprofile/${id}`);
  };
  return (
    <ContainerFriends>
      <h4>Ami (e):</h4>
      <br />
      <hr />
      {friends.map((friend) => (
        <Friend key={friend.id} onClick={() => viewProfile(friend.id)}>
          <img src={`http://localhost:3000/${friend.avatar}`} alt="avatar" />
          <p>
            {friend.userName}
            {friend.verifyProfile && <LogoVerifiyProfile />}
          </p>
        </Friend>
      ))}
    </ContainerFriends>
  );
}

export default Friends;
