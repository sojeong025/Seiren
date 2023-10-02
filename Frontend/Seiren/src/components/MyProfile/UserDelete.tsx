import { useEffect, useState } from "react";
import { customAxios } from "../../libs/axios";
import styles from "./UserDelete.module.css";
import MyModal from "../common/MyModal";
import { useNavigate } from "react-router-dom";

function UserDelete() {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅을 사용하여 페이지 이동을 관리

  useEffect(() => {
    customAxios
      .put("user")
      .then(response => {
        // 여기서 필요한 처리를 수행하거나 상태를 업데이트하세요.
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
      });
  }, []);

  const handleDelete = () => {
    // 확인 버튼을 눌렀을 때 실행되는 함수
    // 탈퇴 요청을 보내고, 성공하면 모달을 닫고 메인 페이지로 이동합니다.
    customAxios
      .delete("user") // 예: DELETE 요청을 보내서 탈퇴 처리
      .then(response => {
        // 탈퇴가 성공적으로 이루어진 경우 여기서 필요한 처리를 수행하거나 상태를 업데이트하세요.
        localStorage.clear(); // 로컬 스토리지 비우기
        setModalOpen(false); // 모달 닫기
        navigate("/"); // 메인 페이지로 이동 ("/"는 메인 페이지 경로에 맞게 수정하세요)
      })
      .catch(error => {
        console.error("API 호출 중 오류 발생:", error);
        // 탈퇴에 실패한 경우 에러 처리 또는 사용자에게 알림을 보여줄 수 있습니다.
      });
  };

  return (
    <div className={styles.deleteContainer}>
      <div className={styles.delete} onClick={() => setModalOpen(true)}>
        회원탈퇴
      </div>
      <MyModal
        content={
          <div className={styles.modalContainer}>
            <h2 className={styles.modalTitle}>회원탈퇴</h2>
            <p className={styles.content}>정말 탈퇴하시겠습니까?</p>
            <div className={styles.buttons}>
              <button onClick={handleDelete} className={styles.submitButton}>
                확인
              </button>
              <button onClick={() => setModalOpen(false)} className={styles.cancelButton}>
                취소
              </button>
            </div>
          </div>
        }
        open={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}

export default UserDelete;
