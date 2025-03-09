import "./App.css";
import HomePage from "./pages/HomePage";
import ShareCartPage from "./pages/ShareCartPage/index.js";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share/:id" element={<ShareCartPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
