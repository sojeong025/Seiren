import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// 메인 페이지
import MainPage from "./pages/MainPage";

// 프로그램 소개 페이지
import AboutPage from "./pages/AboutPage";

// 목소리 장터 페이지
import VoiceMarketPage from "./pages/VoiceMarketPage/VoiceMarketPage";
import VoiceDetailPage from "./pages/VoiceMarketPage/VoiceDetailPage";

// 목소리 학습 페이지
import VoiceStudyPage from "./pages/VoiceStudyPage";

// 마이 페이지
import MyPage from "./pages/MyPages/MyPage";
import BuyList from "./pages/MyPages/BuyList";
import SellList from "./pages/MyPages/SellList";
import DetailPage from "./components/SellLists/DetailPage";

// 공통
import NavBar from "./components/common/NavBar";

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/voice-market" element={<VoiceMarketPage />} />
        <Route path="/voice/:id" element={<VoiceDetailPage />} />
        <Route path="/voice-study" element={<VoiceStudyPage />} />
        
        <Route path="/my-page" element={<MyPage />} />
        <Route path="/buy-list" element={<BuyList />} />
        <Route path="/sell-list" element={<SellList />} />
        <Route path="/detail/:index" element={<DetailPage />} />

      </Routes>
    </Router>
  );
}

export default App;
