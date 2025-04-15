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
    playerTurn: "none", // "none" | "o" | "x"
  },
};

const StoreContext = React.createContext(null);

const storeReducer = (data, action) => {
  switch (action.type) {
    case "create": {
      data.session = action.payload;
      return data;
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
