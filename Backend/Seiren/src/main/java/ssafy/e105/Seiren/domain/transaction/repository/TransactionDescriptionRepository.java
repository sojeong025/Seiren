package ssafy.e105.Seiren.domain.transaction.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.transaction.entity.TransactionDescription;

public interface TransactionDescriptionRepository extends
        JpaRepository<TransactionDescription, Long> {

    @Query(value = "SELECT td from TransactionDescription td LEFT JOIN Transaction t ON td.transaction.id = t.id WHERE t.buyer.id = :userId")
    Page<TransactionDescription> findAllByTransaction(@Param("userId") Long userId,
            Pageable pageable);

    @Query("SELECT td FROM TransactionDescription td WHERE td.transaction.product.productId = :productId AND td.transaction.seller.id = :userId ORDER BY td.buyDate DESC")
    List<TransactionDescription> findByProductIdAndSellerIdOrderByBuyDateDESC(
            @Param("productId") Long productId, @Param("userId") Long userId);

    @Query("SELECT td FROM TransactionDescription td WHERE td.transaction.seller.id = :userId AND FUNCTION('MONTH', td.buyDate) = :month")
    List<TransactionDescription> findBySellerIdAndMonth(@Param("userId") Long userId, int month);
}
