import { createTheme, ThemeProvider } from "@mui/material/styles"; // ThemeProvider 추가
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import styles from "./Pagination.module.css";

// 새로운 테마 생성
const theme = createTheme({
  palette: {
    primary: {
      main: "#ccc", // 원하는 회색 색상 코드로 변경
    },
  },
});

function MyPagination({ itemsPerPage = 10, currentPage, onPageChange, totalAmount = 0 }) {
  const pageCount = Math.ceil(totalAmount / itemsPerPage);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <ThemeProvider theme={theme}>
      <Stack spacing={2} direction="row" justifyContent="center">
        <Pagination
          count={pageCount || 1} // pageCount가 0 또는 NaN인 경우 1로 설정
          page={currentPage}
          onChange={handleChange}
          size="large"
          shape="rounded"
          color="primary"
          classes={{ ul: styles.pagination }}
        />
      </Stack>
    </ThemeProvider>
  );
}

export default MyPagination;
