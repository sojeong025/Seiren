import FavoriteVoice from "../../components/VoiceMarket/FavoriteVoice";
import Filter from "../../components/VoiceMarket/Filter";
import styles from "./VoiceMarketPage.module.css"
import { Link } from 'react-router-dom';


interface Voice {
  id: number;
  avatar: string;
  title: string;
  seller: string;
  category: string;
}

const voices: Voice[] = [
  {
    id: 1,
    avatar: "avatar_url_1",
    title: "Voice Title 1",
    seller: "Seller Nickname 1",
    category: "Category 1"
  },
  {
    id: 2,
    avatar: "avatar_url_2",
    title: "Voice Title 2",
    seller: "Seller Nickname 2",
    category: "Category 2"
  },
  {
    id: 1,
    avatar: "avatar_url_1",
    title: "Voice Title 1",
    seller: "Seller Nickname 1",
    category: "Category 1"
  },
  {
    id: 3,
    avatar: "avatar_url_2",
    title: "Voice Title 2",
    seller: "Seller Nickname 2",
    category: "Category 2"
  },
  {
    id: 4,
    avatar: "avatar_url_1",
    title: "Voice Title 1",
    seller: "Seller Nickname 1",
    category: "Category 1"
  },
  {
    id: 5,
    avatar: "avatar_url_2",
    title: "Voice Title 2",
    seller: "Seller Nickname 2",
    category: "Category 2"
  },
  {
    id: 6,
    avatar: "avatar_url_1",
    title: "Voice Title 1",
    seller: "Seller Nickname 1",
    category: "Category 1"
  },
  {
    id: 7,
    avatar: "avatar_url_2",
    title: "Voice Title 2",
    seller: "Seller Nickname 2",
    category: "Category 2"
  },

];
function VoiceCard({ voice }: { voice : Voice }) {
  return (
    <Link to={`/voice/${voice.id}`} className={styles.card}>
      <img src={voice.avatar} alt="Avatar" />
      <h3>{voice.title}</h3>
      <p>{voice.seller}</p>
      <p>{voice.category}</p>
    </Link>
  );
}
function VoiceMarketPage() {
  return (
    <div>
      <FavoriteVoice/>
      <Filter />
      <div className={styles.container}>
        <div className={styles.cards}>
          {voices.map((voice, index) => (
            <VoiceCard key={index} voice={voice} />
          ))}
      </div>
    </div>
    </div>
  );
}

export default VoiceMarketPage;