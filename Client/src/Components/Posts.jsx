import styled from "styled-components";
import Post from "./Post";
const ContainerPosts = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 500px;
  border-radius: 5px;
  margin-top: 40px;
`;

const SinglePost = styled.div`
  width: 80%;
`;
function Posts() {
  return (
    <ContainerPosts>
      <SinglePost>
        <Post />
      </SinglePost>
    </ContainerPosts>
  );
}

export default Posts;
