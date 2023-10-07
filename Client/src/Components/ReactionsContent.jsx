import styled from "styled-components";
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

function ReactionsContent({ like, dislike }) {
  return (
    <Reactions>
      <ReactionContent>
        <LikeIcon />
        <NumberOfReactions>{like.length} </NumberOfReactions>
        <DislikeIcon />
        <NumberOfReactions>{dislike.length} </NumberOfReactions>
      </ReactionContent>
    </Reactions>
  );
}

export default ReactionsContent;
