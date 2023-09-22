import { ReactNode } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import styles from "./MyModal.module.css";

interface MyModalProps {
  content: ReactNode;
  open: boolean;
  onClose: () => void; // onClose prop 추가
}

function MyModal({ content, open, onClose }: MyModalProps) {
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={styles.modal}>{content}</Box>
    </Modal>
  );
}

export default MyModal;
