import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

// 메인 페이지
import MainPage from "./pages/MainPage";

// 프로그램 소개 페이지
import AboutPage from "./pages/AboutPage";

// 목소리 장터 페이지
import VoiceMarketPage from "./pages/VoiceMarketPage/VoiceMarketPage";
import VoiceDetailPage from "./pages/VoiceMarketPage/VoiceDetailPage";
import ProductCustomPage from "./pages/VoiceMarketPage/ProductCustomPage";

// 목소리 학습 페이지
import VoiceStudyPage from "./pages/VoiceStudyPages/VoiceStudyPage";
import VoiceRecordPage from "./pages/VoiceStudyPages/VoiceRecordPage";
import VoiceStudyingPage from "./pages/VoiceStudyPages/VoiceStudyingPage";
import VoiceFinishPage from "./pages/VoiceStudyPages/VoiceFinishPage";

// 마이 페이지
import MyPage from "./pages/MyPages/MyPage";
import BuyList from "./pages/MyPages/BuyList";
import SellList from "./pages/MyPages/SellList";
import DetailPage from "./pages/MyPages/DetailPage";
import UseVoice from "./pages/MyPages/UseVoice";
// import UseVoiceDetail from "./components/UseVoice/UseVoiceDetail";
import YourVoiceDetail from "./components/MyProfile/YourVoiceDetail";

// 로그인
import LoginPage from "./pages/LoginPages/LoginPage";
import OAuth2RedirectHandler from "./pages/LoginPages/OAuth2RedirectHandler";

// 공통
import NavBar from "./components/common/NavBar";

function App() {
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  

  return (
    <Router>
      {isNavBarVisible && <NavBar />}
      <Routes>
        <Route path="/" element={<MainPage />} />
      </Routes>

      <div className="content">
        <Routes>
          <Route path="/about" element={<AboutPage />} />

          {/* 목소리 장터 페이지 */}
          <Route path="/voice-market" element={<VoiceMarketPage />} />
          <Route path="/voice/:id" element={<VoiceDetailPage />} />
          <Route path="/product-custom" element={<ProductCustomPage />} />

          {/* 목소리 등록 페이지 */}
          <Route path="/voice-study" element={<VoiceStudyPage />} />
          <Route path="/voice-record" element={<VoiceRecordPage />} />
          <Route path="/voice-studying" element={<VoiceStudyingPage />} />
          <Route path="/voice-finish" element={<VoiceFinishPage />} />

          {/* 마이페이지 */}
          <Route path="/my-page" element={<MyPage setIsNavBarVisible={setIsNavBarVisible} />} />
          <Route path="/buy-list" element={<BuyList setIsNavBarVisible={setIsNavBarVisible} />} />
          <Route path="/sell-list" element={<SellList setIsNavBarVisible={setIsNavBarVisible} />} />
          <Route path="/use-voice" element={<UseVoice setIsNavBarVisible={setIsNavBarVisible} />} />
          <Route path="/detail/:index" element={<DetailPage />} />
          {/* <Route path="/voice-detail/:productId" element={<UseVoiceDetail setIsNavBarVisible={setIsNavBarVisible} />} /> */}
          <Route path="/your-voice-detail/:voiceId" element={<YourVoiceDetail />} />

          {/* 로그인 */}
          <Route path="/login" element={<LoginPage setIsNavBarVisible={setIsNavBarVisible} />} />
          <Route path="/oauth/callback/kakao" element={<OAuth2RedirectHandler />} />
        </Routes>
      </div>  
    </Router>
  );
}

export default App;
