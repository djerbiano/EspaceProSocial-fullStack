import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
import Loader from "./Loader";
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
  margin-bottom: 20px;
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
  justify-content: flex-end;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
`;

const DeletePost = styled.a`
  font-size: 20px;
  color: red;
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

function Post() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [clickedImage, setClickedImage] = useState(null);
  const [fullscreen, setFullScreen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [, setPostId] = useState();
  const userId = sessionStorage.getItem("userId");
  const idAdmin = process.env.REACT_APP_ID;
  const [authorsData, setAuthorsData] = useState({});

  const handleImageClick = (imageUrl) => {
    setFullScreen(true);
    setClickedImage(imageUrl);
  };
  // delete post
  const handleDeleteClick = async (postIdToDelete) => {
    setPostId(postIdToDelete);

    try {
      await fetch(
        `http://localhost:3000/api/posts/${userId}/post/${postIdToDelete}`,
        {
          method: "DELETE",
        }
      );
    } catch (error) {
      console.error("Erreur lors de la suppression du post :", error);
    }
  };

  // récupérer les publications
  useEffect(() => {
    setLoading(true);

    fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((data) => {
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
      });
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
            `http://localhost:3000/api/users/${post.author}`
          );
          const authorData = await response.json();
          data[post.author] = authorData;
        }
      }

      setAuthorsData(data);
    };

    fetchAuthorsData();
  }, [posts]);

  const getUserIdClicked = (id) => {
    navigate(`/singleprofile/${id}`);
  };

  return posts.map((post) => (
    <ContainerPost key={post._id}>
      <AuthorPost onClick={() => getUserIdClicked(post.author)}>
        <img
          src={`http://localhost:3000/${
            authorsData[post.author]?.avatar || "avatarDefault.jpg"
          }`}
          alt=""
        />
        <p>{authorsData[post.author]?.userName || "Compte supprimé"}</p>
        {authorsData[post.author]?.verifyProfile && (
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
      </AuthorPost>

      <TitlePost>
        <PostContent>{post.post}</PostContent>
      </TitlePost>
      {post.picture && (
        <PicturePost>
          <img
            src={`http://localhost:3000/${post.picture}`}
            alt=""
            onClick={() =>
              handleImageClick(`http://localhost:3000/${post.picture}`)
            }
          />
        </PicturePost>
      )}
      <DatePost>
        {(userId === post.author || userId === idAdmin) && (
          <DeletePost href="" onClick={() => handleDeleteClick(post._id)}>
            <MdDeleteForever />
          </DeletePost>
        )}
        <p>{post.updatedAt}</p>
      </DatePost>

      {fullscreen && (
        <FullscreenElement onClick={() => setFullScreen(!fullscreen)}>
          <img src={clickedImage} alt="" />
        </FullscreenElement>
      )}
      {loading && <Loader />}
    </ContainerPost>
  ));
}

export default Post;
