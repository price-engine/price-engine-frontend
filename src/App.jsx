import "./App.css";
import HomePage from "./pages/HomePage/index.jsx";
import ShareCartPage from "./pages/ShareCartPage/index.jsx";
import DonatePage from "./pages/Article-Pages/DonatePage/index.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import PrivacyPolicy from "./pages/Article-Pages/PrivacyPolicyPage/index.jsx";
import HowToSearchPage from "./pages/Article-Pages/HowToSearchPage/index.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/share/:id" element={<ShareCartPage />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/privacy-policy" element={<PrivacyPolicy />} />
        <Route path="/how-to-search" element={<HowToSearchPage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
