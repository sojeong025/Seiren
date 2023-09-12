import styles from './MyPage.module.css';
import MyInfo from '../components/MyProfile/MyInfo';

function MyPage() {
  return (
    <div>
      <MyInfo />
      <h3>Likes</h3>
      <h3>Your Voice</h3>
    </div>
  );
}

export default MyPage;
