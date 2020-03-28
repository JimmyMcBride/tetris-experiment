import { useSelector } from "react-redux";
import styled from "styled-components";
import { Playfield } from "../components";
import StartGameModal from "../components/modals/StartGameModal";
import ScoreBoard from "../components/score/ScoreBoard";

function Index() {
  const { gameStarted } = useSelector(state => state.game);

  return (
    <Container>
      {!gameStarted && <StartGameModal />}
      <Wrapper>
        <Column />
        <Playfield />
        <Column>
          <ScoreBoard />
        </Column>
      </Wrapper>
    </Container>
  );
}

export default Index;

const Container = styled.div`
  display: flex;
  // align-items: center;
  background-color: #c0c0c0;
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const Column = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  width: calc(100% / 3);
  max-height: 100%;
  background-color: #a0d0df;
`;
