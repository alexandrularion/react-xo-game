import styled from "styled-components";
import { useStore } from "../store";

const BoardMetrics = () => {
  const { state } = useStore();

  return (
    <Container>
      <p>{state.players.player.wins}</p>
      <p>{state.players.cpu.wins}</p>
      <p>{state.players.ties}</p>
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

export default BoardMetrics;
