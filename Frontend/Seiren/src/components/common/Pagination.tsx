import React from "react";
import styles from "./Pagination.module.css";

function Pagination({ itemsPerPage, currentPage, onPageChange, totalAmount }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalAmount / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className={styles.pagination}>
        {pageNumbers.map(number => (
          <li key={number} className={`page-item ${currentPage === number ? styles.active : ""}`}>
            <a onClick={() => onPageChange(number)} href="#!" className={`page-link ${styles.pageLink}`}>
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
