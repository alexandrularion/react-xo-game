import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import GameBoardPage from "./pages/game-board.page";
import GameMenuPage from "./pages/game-menu.page";
import RegisterPage from "./pages/register.page";
import StoreProvider from "./store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Tip: It provides the store state which includes the data accessible witihn child components */}
    <StoreProvider>
      {/* Tip: It provides specific hooks and data global accessible within child components */}
      <BrowserRouter>
        {/* Tip: The Routes must be parent of any set of routes */}
        <Routes>
          {/* Tip: The Route helps us to create a page */}
          <Route index={true} element={<RegisterPage />} />
          {/* Tip: Nested routes helps use to group pages under specific prefixes */}
          <Route path="game">
            {/* Tip: We can access the page under "/game/menu" */}
            <Route path="menu" element={<GameMenuPage />} />
            <Route path="board" element={<GameBoardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </StoreProvider>
  </StrictMode>
);
