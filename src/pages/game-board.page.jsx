import styled from "styled-components";
import BoardGrid from "../components/board-grid";
import React from "react";
import { useStore } from "../store";
import BoardMetrics from "../components/board-metrics";

const GameBoardPage = () => {
  const { dispatch } = useStore();

  React.useEffect(() => {
    dispatch({
      type: "set-players-mark",
      payload: {
        player: "x",
        cpu: "o",
      },
    });
  }, [dispatch]);

  return (
    <Container>
      <p>Game board page</p>
      <BoardGrid />
      <BoardMetrics />
    </Container>
  );
};

const Container = styled.main`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export default GameBoardPage;
