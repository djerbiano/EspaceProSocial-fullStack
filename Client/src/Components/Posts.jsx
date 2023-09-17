import styled from "styled-components";
import Post from "./Post";
const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 500px;
  background-color: rgb(214, 148, 26);
`;

const SinglePost = styled.div`
  width: 80%;
`;
function Posts() {
  return (
    <ContainerPosts>
      <SinglePost>
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </SinglePost>
    </ContainerPosts>
  );
}

export default Posts;
