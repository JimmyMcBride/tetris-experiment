import { useSelector } from "react-redux";
// import withApollo from "../lib/with-apollo";
import { Playfield } from "../components";
import StartGameModal from "../components/modals/StartGameModal";
import ScoreBoard from "../components/score/ScoreBoard";
import { Wrapper, Box, Flex } from "bushido-strap";

function Index() {
  const { gameStarted } = useSelector((state: any) => state.game);

  return (
    <Wrapper>
      {!gameStarted && <StartGameModal />}
      <Flex wrap="true">
        <Box w="calc(100% / 3)" maxH="100%" />
        <Playfield />
        <Flex w="calc(100% / 3)" maxH="100%">
          <ScoreBoard />
        </Flex>
      </Flex>
    </Wrapper>
  );
}

export default Index;
// export default withApollo(Index);
