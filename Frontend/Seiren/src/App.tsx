import { useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";


// 메인 페이지
import MainPage from "./pages/MainPage";

// 프로그램 소개 페이지
import AboutPage from "./pages/AboutPage";

// 목소리 장터 페이지
import VoiceMarketPage from "./pages/VoiceMarketPage/VoiceMarketPage";
import ProductDetailPage from "./pages/VoiceMarketPage/ProductDetailPage";
import ProductCustomPage from "./pages/VoiceMarketPage/ProductCustomPage";
import PurchasePage from "./pages/VoiceMarketPage/PurchasePage";

// 목소리 학습 페이지
import VoiceStudyPage from "./pages/VoiceStudyPages/VoiceStudyPage";
import VoiceRecordPage from "./pages/VoiceStudyPages/VoiceRecordPage";
import VoiceStudyingPage from "./pages/VoiceStudyPages/VoiceStudyingPage";
import VoiceFinishPage from "./pages/VoiceStudyPages/VoiceFinishPage";

// 마이 페이지
import MyPage from "./pages/MyPages/MyPage";
import BuyList from "./pages/MyPages/BuyList";
import SellList from "./pages/MyPages/SellList";
import SellDetail from "./components/SellLists/SellDetail";
import DetailPage from "./pages/MyPages/DetailPage";
import UseVoice from "./pages/MyPages/UseVoice";
import UseVoiceDetail from "./components/UseVoice/UseVoiceDetail";
import YourVoiceDetail from "./components/MyProfile/YourVoiceDetail";

// 로그인
import LoginPage from "./pages/LoginPages/LoginPage";
import OAuth2RedirectHandler from "./pages/LoginPages/OAuth2RedirectHandler";

// 공통
import NavBar from "./components/common/NavBar";
import ScrollToTop from "./components/common/ScrollToTop";


function App() {
  const [isNavBarVisible, setIsNavBarVisible] = useState(true);

  return (
    <Router>
      <RoutesComponent isNavBarVisible={isNavBarVisible} setIsNavBarVisible={setIsNavBarVisible} />
    </Router>
  );
}

function RoutesComponent({ isNavBarVisible, setIsNavBarVisible }) {
  const location = useLocation(); // get the current location

  return (
    <>
      {isNavBarVisible && <NavBar />}
        <AnimatePresence mode="wait">
          <ScrollToTop/>
          <Routes location={location} key={location.pathname}>

          <Route path="/" element={<MainPage />} />
          <Route path="/about" element={<AboutPage />} />
          {/* 목소리 장터 페이지 */}
          <Route path="/voice-market" element={<VoiceMarketPage />} />
          <Route path="/product/:productId" element={<ProductDetailPage />} />
          <Route path="/product-custom" element={<ProductCustomPage />} />
          <Route path="/purchase" element={<PurchasePage />} />

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
          <Route path="/voice-detail/:productId" element={<UseVoiceDetail setIsNavBarVisible={setIsNavBarVisible} />} />
          <Route path="/your-voice-detail/:voiceId" element={<YourVoiceDetail />} />
          <Route path="/sell-list/detail/:productId" element={<SellDetail />} />

          {/* 로그인 */}
          <Route path="/login" element={<LoginPage setIsNavBarVisible={setIsNavBarVisible} />} />
          <Route path="/oauth/callback/kakao" element={<OAuth2RedirectHandler />} />
          </Routes>
        </AnimatePresence>
    </>
  );
}

export default App;