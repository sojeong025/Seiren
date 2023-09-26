import { Link } from 'react-router-dom';
import styles from './FavoriteVoice.module.css';

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

function FavoriteVoice() {
  return (
    <div className={styles.container}>
        <div className={styles.FavText}>좋아요 누른 목소리나 캐러샐을 통한 광고 느낌</div>
        <div className={styles.cards}>
          {voices.map((voice, index) => (
            <VoiceCard key={index} voice={voice} />
          ))}
      </div>
    </div>
  );
}

export default FavoriteVoice;
