import React from "react";

const initialState = {
  session: {
    playerName: "",
    createdAt: "", // ISO 8601 - 2025-04-15T15:54:26.055Z
  },
  players: {
    player: {
      mark: "", // "o" or "x"
      timeout: -1,
      wins: 0,
    },
    cpu: {
      mark: "", // "o" or "x"
      timeout: 10000, // 10s
      wins: 0,
    },
    ties: 0,
  },
  game: {
    boardWinCombinations: [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [2, 4, 6],
      [0, 4, 8],
    ],
    boardGridList: [
      { winCombination: 0, mark: null },
      { winCombination: 1, mark: null },
      { winCombination: 2, mark: null },
      { winCombination: 3, mark: null },
      { winCombination: 4, mark: null },
      { winCombination: 5, mark: null },
      { winCombination: 6, mark: null },
      { winCombination: 7, mark: null },
      { winCombination: 8, mark: null },
    ],
    playerTurn: "x", // "o" | "x"
    playerWinner: null, // "o" | "x" | "tied"
    metricsUpdated: false,
  },
};

const StoreContext = React.createContext({
  state: initialState,
  dispatch: () => {},
});

const storeReducer = (data, action) => {
  switch (action.type) {
    case "set-players-mark": {
      return {
        ...data,
        players: {
          ...data.players,
          player: {
            ...data.players.player,
            mark: action.payload.player, // "o" or "x"
          },
          cpu: {
            ...data.players.cpu,
            mark: action.payload.cpu, // "o" or "x"
          },
        },
        game: {
          ...data.game,
          playerTurn: "x",
        },
      };
    }
    case "set-game-board-grid-list": {
      return {
        ...data,
        game: {
          ...data.game,
          boardGridList: action.payload,
        },
      };
    }
    case "set-game-player-turn": {
      return {
        ...data,
        game: {
          ...data.game,
          playerTurn: action.payload,
        },
      };
    }
    case "set-game-player-winner": {
      return {
        ...data,
        game: {
          ...data.game,
          playerWinner: action.payload,
        },
      };
    }
    case "set-players-metrics": {
      return {
        ...data,
        players: {
          ...data.players,
          player: {
            ...data.players.player,
            wins: data.players.player.wins + action.payload.playerWins,
          },
          cpu: {
            ...data.players.cpu,
            wins: data.players.cpu.wins + action.payload.cpuWins,
          },
          ties: data.players.ties + action.payload.ties,
        },
        game: {
          ...data.game,
          metricsUpdated: true,
        },
      };
    }
  }
};

const StoreProvider = (props) => {
  // Tip: useReducer helps us to create a more complex state like useState does
  const [state, dispatch] = React.useReducer(storeReducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};

// Tip: Custom hook to retrieve the context value within any child components
export const useStore = () => {
  return React.useContext(StoreContext);
};

export default StoreProvider;
