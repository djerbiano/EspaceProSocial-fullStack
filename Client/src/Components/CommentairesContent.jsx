import styled from "styled-components";
import ReactionsContentForComment from "./ReactionsContentForComment";
import { useState, useEffect } from "react";
import { MdDeleteForever } from "react-icons/md";

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

  useEffect(() => {
    fetch(`http://localhost:3000/api/posts/${currentUser}/${props.postId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
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
        `http://localhost:3000/api/comments/${currentUser}/post/${props.postId}/comment/${commentIdToDelete}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
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
                src={`http://localhost:3000/${comment.author.avatar}`}
                alt="avatar"
              />
              <h3>
                {comment.author.userName}{" "}
                <span>
                  {comment.author.verifyProfile && (
                    <svg
                      fill="blue"
                      viewBox="0 0 12 13"
                      width="2em"
                      height="1em"
                      title="Compte vérifié"
                    >
                      <title>Compte vérifié</title>
                      <g transform="translate(-98 -917)">
                        <path d="m106.853 922.354-3.5 3.5a.499.499 0 0 1-.706 0l-1.5-1.5a.5.5 0 1 1 .706-.708l1.147 1.147 3.147-3.147a.5.5 0 1 1 .706.708m3.078 2.295-.589-1.149.588-1.15a.633.633 0 0 0-.219-.82l-1.085-.7-.065-1.287a.627.627 0 0 0-.6-.603l-1.29-.066-.703-1.087a.636.636 0 0 0-.82-.217l-1.148.588-1.15-.588a.631.631 0 0 0-.82.22l-.701 1.085-1.289.065a.626.626 0 0 0-.6.6l-.066 1.29-1.088.702a.634.634 0 0 0-.216.82l.588 1.149-.588 1.15a.632.632 0 0 0 .219.819l1.085.701.065 1.286c.014.33.274.59.6.604l1.29.065.703 1.088c.177.27.53.362.82.216l1.148-.588 1.15.589a.629.629 0 0 0 .82-.22l.701-1.085 1.286-.064a.627.627 0 0 0 .604-.601l.065-1.29 1.088-.703a.633.633 0 0 0 .216-.819"></path>
                      </g>
                    </svg>
                  )}
                </span>
              </h3>
              <hr />
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
