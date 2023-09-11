import { NavLink } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <NavLink to="/about">About</NavLink>
      <NavLink to="/voice-market">VoiceMarket</NavLink>
      <NavLink to="/voice-study">VoiceStudy</NavLink>
      <NavLink to="/my-page">MyPage</NavLink>
    </nav>
  );
}

export default NavBar;