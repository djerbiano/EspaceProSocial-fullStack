import styled from "styled-components";
import { useState } from "react";
import { AiFillLike, AiFillDislike } from "react-icons/ai";

const Reactions = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
`;

const ReactionContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 10px;
  & p {
    margin-right: 10px;
  }
`;

const LikeIcon = styled(AiFillLike)`
  font-size: 24px;
  color: #007bff;
  margin-right: 5px;

  &:hover {
    scale: 1.5;
    transition: 0.4s;
    cursor: pointer;
  }
`;

const DislikeIcon = styled(AiFillDislike)`
  font-size: 24px;
  color: red;
  margin-right: 5px;
  &:hover {
    scale: 1.5;
    transition: 0.4s;
    cursor: pointer;
  }
`;

const NumberOfReactions = styled.p`
  font-weight: bold;
`;

function ReactionsContent({ postId, currentUser }) {
  const [likeLength, setLikeLength] = useState();
  const [dislikeLength, setDislikeLength] = useState();
  const ApiAdresse = process.env.REACT_APP_URL_SERVER;

  // like post
  const stateOfLikesAndDislikes = () => {
    fetch(`${ApiAdresse}/api/posts/${currentUser}/${postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLikeLength(data.likes.length);
        setDislikeLength(data.dislikes.length);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  stateOfLikesAndDislikes();

  const handleLike = () => {
    fetch(`${ApiAdresse}/api/posts/${currentUser}/${postId}/likes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        stateOfLikesAndDislikes();
      });
  };

  const handleDislike = () => {
    fetch(`${ApiAdresse}/api/posts/${currentUser}/${postId}/dislikes`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        stateOfLikesAndDislikes();
      });
  };
  // like post

  return (
    <Reactions>
      <ReactionContent>
        <LikeIcon onClick={handleLike} />
        <NumberOfReactions>{likeLength} </NumberOfReactions>
        <DislikeIcon onClick={handleDislike} />
        <NumberOfReactions>{dislikeLength} </NumberOfReactions>
      </ReactionContent>
    </Reactions>
  );
}

export default ReactionsContent;
