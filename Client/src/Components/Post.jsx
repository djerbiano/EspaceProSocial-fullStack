import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import Loader from "./Loader";
import SetCommentaire from "./SetCommentaires";
import CommentairesContent from "./CommentairesContent";
import ReactionsContent from "./ReactionsContent";
import LogoVerifiyProfile from "./ReusableComponent/VerifyProfile";
const ContainerPost = styled.div`
  width: 100%;
  min-height: 200px;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
`;

const AuthorPost = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;

  & p {
    margin-left: 10px;
    font-size: 20px;
    font-weight: bold;
    &:hover {
      scale: 1.2;
      transition: 0.4s;
    }
  }

  & img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
    margin-right: 10px;
  }
`;
const TitlePost = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  margin: 10px 0 50px 0;
`;
const PostContent = styled.p`
  word-break: break-all;
  font-size: 20px;
`;
const PicturePost = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  & img {
    width: 50%;
    max-height: 500px;
    object-fit: cover;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
    &:hover {
      scale: 1.01;
      transition: 0.4s;
      cursor: pointer;
    }
  }
`;

const DatePost = styled.div`
  width: 100%;
  height: 10%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 15px;
  font-weight: bold;
  margin-bottom: 20px;
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
const FullscreenElement = styled.div`
  width: 100vw;
  height: 100vh;
  backdrop-filter: blur(50px);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  & img {
    width: 50%;
    aspect-ratio: 1/1;
    object-fit: contain;
    border-radius: 5px;
    box-shadow: 0 0 5px 5px rgba(0, 0, 0, 0.2);
  }
`;
const ReactionContainer = styled.div`
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

const LikeDislikeContainer = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;
  height: 100%;
  margin: 6px 20px 0 0;
`;

const CommentairesContainer = styled.div`
  height: 100%;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  margin-right: 80px;
`;
const Commentaires = styled.p`
  font-weight: bold;
`;

function Post(postId) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [clickedImage, setClickedImage] = useState(null);
  const [fullscreen, setFullScreen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [, setPostId] = useState();
  const userId = sessionStorage.getItem("userId");
  const idAdmin = process.env.REACT_APP_ID;
  const [authorsData, setAuthorsData] = useState({});
  const ApiAdresse = process.env.REACT_APP_URL_SERVER;

  const handleImageClick = (imageUrl) => {
    setFullScreen(true);
    setClickedImage(imageUrl);
  };
  // delete post
  const handleDeleteClick = async (postIdToDelete) => {
    setPostId(postIdToDelete);

    try {
      await fetch(
        `${ApiAdresse}/api/posts/${userId}/post/${postIdToDelete}`,
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

  // récupérer les publications
  useEffect(() => {
    setLoading(true);
    fetch(`${ApiAdresse}/api/posts/${userId}`, {
      method: "GET",
      headers: {
        token: sessionStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "There are no posts in the database") {
          
         return  null;
          
        } else {
          const formattedPosts = data.map((post) => {
            post.updatedAt = new Date(post.updatedAt);
            return post;
          });
  
          formattedPosts.sort((a, b) => b.updatedAt - a.updatedAt);
          const finalFormattedPosts = formattedPosts.map((post) => ({
            ...post,
            updatedAt: post.updatedAt.toLocaleString(),
          }));
  
          setPosts(finalFormattedPosts);
          setLoading(false);
        }
      
      });
    //eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Récupérer les données des auteurs pour chaque publication
  useEffect(() => {
    const fetchAuthorsData = async () => {
      const data = {};

      for (const post of posts) {
        // si déjà récupéré les données de cet auteur
        if (!data[post.author]) {
          // Si non requête pour obtenir les données de l'auteur
          const response = await fetch(
            `${ApiAdresse}/api/users/${post.author}`,
            {
              method: "GET",
              headers: {
                token: sessionStorage.getItem("token"),
              },
            }
          );
          const authorData = await response.json();
          data[post.author] = authorData;
        }
      }

      setAuthorsData(data);
    };

    fetchAuthorsData();
    // eslint-disable-next-line
  }, [posts]);

  const getUserIdClicked = (id) => {
    navigate(`/singleprofile/${id}`);
  };

  return posts.length > 0 ? (
    posts.map((post) => (
      <ContainerPost key={post._id}>
        <AuthorPost onClick={() => getUserIdClicked(post.author)}>
          <img
            src={`${ApiAdresse}/images/${
              authorsData[post.author]?.avatar || "avatarDefault.jpg"
            }`}
            alt=""
          />
          <p>{authorsData[post.author]?.userName || "Compte supprimé"}</p>
          {authorsData[post.author]?.verifyProfile && <LogoVerifiyProfile />}
        </AuthorPost>
        <DatePost>
          <p>{post.updatedAt.toString().substring(0, 10)}</p>

          {(userId === post.author || userId === idAdmin) && (
            <DeletePost href="" onClick={() => handleDeleteClick(post._id)}>
              <MdDeleteForever />
            </DeletePost>
          )}
        </DatePost>

        <TitlePost>
          <PostContent>{post.post}</PostContent>
        </TitlePost>
        {post.picture && (
          <PicturePost>
            <img
              src={`${ApiAdresse}/images/${post.picture}`}
              alt=""
              onClick={() =>
                handleImageClick(`${ApiAdresse}/images/${post.picture}`)
              }
            />
          </PicturePost>
        )}
        <ReactionContainer>
          <LikeDislikeContainer>
            <ReactionsContent
              like={post.likes}
              dislike={post.dislikes}
              postId={post._id}
              currentUser={userId}
            />
          </LikeDislikeContainer>
          <CommentairesContainer>
            <Commentaires>{post.comments.length} commentaires</Commentaires>
          </CommentairesContainer>
        </ReactionContainer>
        <SetCommentaire postId={post._id} />
        <CommentairesContent postId={post._id} />

        {fullscreen && (
          <FullscreenElement onClick={() => setFullScreen(!fullscreen)}>
            <img src={clickedImage} alt="" />
          </FullscreenElement>
        )}

        {loading && <Loader />}
      </ContainerPost>
    ))
  ) : (
    <ContainerPost>
    <p>Aucune publication</p>
    </ContainerPost>
  );
}

export default Post;
