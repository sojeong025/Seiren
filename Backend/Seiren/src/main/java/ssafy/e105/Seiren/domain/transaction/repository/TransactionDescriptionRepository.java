package ssafy.e105.Seiren.domain.transaction.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.transaction.entity.TransactionDescription;

public interface TransactionDescriptionRepository extends
        JpaRepository<TransactionDescription, Long> {

    @Query(value = "SELECT td from TransactionDescription td LEFT JOIN Transaction t ON td.transaction.id = t.id WHERE t.buyer.id = :userId")
    Page<TransactionDescription> findAllByTransaction(@Param("userId") Long userId, Pageable pageable);

}
