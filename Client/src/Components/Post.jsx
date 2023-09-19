import { useEffect, useState } from "react";
import styled from "styled-components";
import { MdDeleteForever } from "react-icons/md";
const ContainerPost = styled.div`
  width: 100%;
  min-height: 200px;
  background-color: aqua;
  margin: 20px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`;

const Statut = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 90%;
`;

const StatutDate = styled.div`
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
function Post() {
  const [posts, setPosts] = useState([]);
  const [, setPostId] = useState();
  const userId = sessionStorage.getItem("userId");
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
  useEffect(() => {
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
      });
  }, []);
  return posts.map((post) => (
    <ContainerPost key={post._id}>
      <Statut>
        <p>{post.post}</p>
        {post.picture &&(
          <div> <img src={`http://localhost:3000/${post.picture}`} alt="" /></div>
  )}
      </Statut>
      <StatutDate>
        {userId === post.author && (
          <DeletePost href="/home" onClick={() => handleDeleteClick(post._id)}>
            <MdDeleteForever />
          </DeletePost>
        )}
        <p>{post.updatedAt}</p>
      </StatutDate>
    </ContainerPost>
  ));
}

export default Post;
