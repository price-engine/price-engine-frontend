import "./App.css";
import HomePage from "./pages/HomePage";
import ShareCartPage from "./pages/ShareCartPage/index.js";
import { BrowserRouter, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share/:id" element={<ShareCartPage />} />
        <Route path="/" element={<HomePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;