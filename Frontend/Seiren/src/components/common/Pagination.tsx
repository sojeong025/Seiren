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

function MyPagination({ itemsPerPage, currentPage, onPageChange, totalAmount }) {
  const pageCount = Math.ceil(totalAmount / itemsPerPage);

  const handleChange = (event, value) => {
    onPageChange(value);
  };

  return (
    <ThemeProvider theme={theme}> {/* ThemeProvider 추가 */}
      <Stack spacing={2} direction="row" justifyContent="center">
        <Pagination
          count={pageCount}
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
