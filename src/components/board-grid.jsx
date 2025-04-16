import styled from "styled-components";
import { useStore } from "../store";
import React from "react";

const checkForWin = (boardWinCombinations, boardGridList, mark) => {
  for (let i = 0; i < boardWinCombinations.length; i++) {
    const [a, b, c] = boardWinCombinations[i]; // One combination at the time, i.e. [0,2,3]
    if (
      boardGridList[a].mark === mark &&
      boardGridList[b].mark === mark &&
      boardGridList[c].mark === mark
    ) {
      return true;
    }
  }
  return false;
};

const checkForTie = (boardGridList) => {
  for (let i = 0; i < boardGridList.length; i++) {
    if (!boardGridList[i].mark) {
      return false;
    }
  }
  return true;
};

const playerTurnMap = {
  x: "o",
  o: "x",
};

const BoardGrid = () => {
  const { state, dispatch } = useStore();

  const handleClick = (winCombination, mark) => {
    console.log("item", winCombination, mark);

    const newBoardGridList = state.game.boardGridList.map((boardItem) => {
      if (boardItem.winCombination === winCombination) {
        return { ...boardItem, mark: mark };
      }
      return boardItem;
    });

    dispatch({
      type: "set-game-board-grid-list",
      payload: newBoardGridList,
    });

    const hasWin = checkForWin(
      state.game.boardWinCombinations, // Tip: Static array
      newBoardGridList,
      mark
    );

    if (hasWin) {
      console.log(`${mark} has won the game.`);

      dispatch({
        type: "set-game-player-winner",
        payload: mark,
      });
    } else {
      const isTied = checkForTie(newBoardGridList);

      if (isTied) {
        console.log("The round is tied.");

        dispatch({
          type: "set-game-player-winner",
          payload: "tied",
        });
      }
    }

    dispatch({
      type: "set-game-player-turn",
      payload: playerTurnMap[mark],
    });
  };

  React.useEffect(() => {
    const localWinner = state.game.playerWinner;
    const shouldUpdate = !state.game.metricsUpdated;

    if (localWinner && shouldUpdate) {
      console.log("player winner", state.game);

      dispatch({
        type: "set-players-metrics",
        payload: {
          playerWins: localWinner === state.players.player.mark ? 1 : 0,
          cpuWins: localWinner === state.players.cpu.mark ? 1 : 0,
          ties: localWinner === "tied" ? 1 : 0,
        },
      });
      // TODO: Remove when implementing modal
      dispatch({
        type: "set-game-player-winner",
        payload: null,
      });
    }
  }, [
    dispatch,
    state.game,
    state.players,
    state.game.playerTurn,
    state.game.playerWinner,
    state.game.metricsUpdated,
  ]);

  return (
    <Container>
      {state.game.boardGridList.map((boardItem) => (
        <div
          key={boardItem.winCombination}
          style={{ width: "150px", height: "150px", background: "teal" }}
          onClick={() =>
            handleClick(boardItem.winCombination, state.game.playerTurn)
          }
        >
          {boardItem.winCombination}
          {/* Tip: Conditial rendering: Render content based on a condition */}
          {boardItem.mark ? (boardItem.mark === "x" ? "X" : "O") : null}
        </div>
      ))}
    </Container>
  );
};

const Container = styled.section`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
`;

export default BoardGrid;
