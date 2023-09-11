import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// pages
import MainPage from "./pages/MainPage";
import AboutPage from "./pages/AboutPage";
import VoiceMarketPage from "./pages/VoiceMarketPage";
import VoiceStudyPage from "./pages/VoiceStudyPage";
import MyPage from "./pages/MyPage";

// common
import NavBar from "./components/common/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/voice-market" element={<VoiceMarketPage />} />
        <Route path="/voice-study" element={<VoiceStudyPage />} />
        <Route path="/my-page" element={<MyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
