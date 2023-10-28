import styled from "styled-components";
import ReactionsContentForComment from "./ReactionsContentForComment";
import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";
import LogoVerifiyProfile from "./ReusableComponent/VerifyProfile";

const Container = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
`;

const CommentaireContent = styled.div`
  width: 100%;
  min-height: 100px;
  max-height: 500px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: inset 0px 0px 0px 0px #afd1e8, inset 4px 4px 15px 0px #91888894,
    5px -50px 0px -30px rgba(0, 0, 0, 0);
  overflow: scroll;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const SingleCommentaire = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-bottom: 10px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: inset -1px -2px 3px 1px rgba(0, 0, 0, 0.2);
`;

const TextComment = styled.p`
  width: 100%;
  overflow: visible;
  word-break: break-all;
  font-size: 15px;
  margin: 10px 10px;
  padding: 10px;
`;

const User = styled.div`
  width: 50%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 10px;
  padding: 20px;
  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
    margin-right: 20px;
    margin-bottom: 10px;
  }
  & h3 {
    font-weight: bold;
    margin-right: 10px;
  }
`;

const LikeContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;

  & a {
    margin: 10px 10px 0px -10px;
  }
`;
const DeletePost = styled.a`
  font-size: 20px;
  color: red;
  margin-left: 10px;
  &:hover {
    scale: 1.5;
    transition: 0.4s;
  }
`;

function CommentairesContent(props) {
  const currentUser = sessionStorage.getItem("userId");
  const [comments, setComments] = useState([]);
  const [, setCommentId] = useState("");
  const ApiAdresse = process.env.REACT_APP_API_ADRESSE;
  useEffect(() => {
    fetch(`${ApiAdresse}/api/posts/${currentUser}/${props.postId}`, {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setComments(data.comments);
      })
      .catch((err) => {
        console.log(err);
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDeleteClick = async (commentIdToDelete) => {
    setCommentId(commentIdToDelete);

    try {
      await fetch(
        `${ApiAdresse}/api/comments/${currentUser}/post/${props.postId}/comment/${commentIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            token: sessionStorage.getItem("token"),
          },
        }
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du post :", error);
    }
  };

  return (
    <Container>
      <CommentaireContent>
        {comments.map((comment) => (
          <SingleCommentaire key={comment._id}>
            <User>
              <img
                src={`${ApiAdresse}/images/${comment.author.avatar}`}
                alt="avatar"
              />
              <h3>
                {comment.author.userName}
                {comment.author.verifyProfile && <LogoVerifiyProfile />}
              </h3>
              <p>{comment.date.toString().substring(0, 10)}</p>
            </User>
            <TextComment>{comment.comments}</TextComment>
            <LikeContainer>
              <ReactionsContentForComment
                commentId={comment._id}
                currentUser={currentUser}
              />
              {currentUser === comment.author._id && (
                <DeletePost
                  href=""
                  onClick={() => handleDeleteClick(comment._id)}
                >
                  <MdDeleteForever />
                </DeletePost>
              )}
            </LikeContainer>
          </SingleCommentaire>
        ))}
      </CommentaireContent>
    </Container>
  );
}

export default CommentairesContent;
