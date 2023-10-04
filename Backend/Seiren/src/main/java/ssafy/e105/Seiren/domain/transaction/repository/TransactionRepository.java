package ssafy.e105.Seiren.domain.transaction.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.transaction.entity.Transaction;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    @Query(value = "SELECT t FROM Transaction t WHERE t.buyer.id = :userId ORDER BY t.id DESC")
    Page<Transaction> findAllByBuyer(@Param("userId") Long userId, Pageable pageable);

    @Query("SELECT t FROM Transaction t WHERE t.product.productId = :productId AND t.seller.id = :sellerId AND t.buyer.id = :buyerId")
    Transaction findTransactionBySellerBuyerAndProductIds(Long productId, Long sellerId,
            Long buyerId);

    @Query(value = "SELECT t FROM Transaction t WHERE t.buyer.id = :userId AND t.product.productId = :productId")
    Optional<Transaction> findByBuyerAndProduct(@Param("userId") Long userId,
            @Param("productId") Long productId);

    @Query(value = "SELECT COUNT(t) FROM Transaction t WHERE t.buyer.id = :userId")
    int findByBuyer(@Param("userId") Long userId);

    @Query("SELECT DISTINCT t.product.productId FROM Transaction t WHERE t.seller.id = :userId")
    List<Long> findAllBySellerId(@Param("userId") Long userId);

    @Query(value = "SELECT SUM(t.totalCount) FROM Transaction t WHERE t.seller.id = :userId AND t.product.productId = :productId")
    int sumTotalCountByProductIdAndSellerId(@Param("userId") Long userId,
            @Param("productId") Long productId);

    @Query("SELECT DISTINCT t.id FROM Transaction t WHERE t.seller.id = :userId AND t.product.productId = :productId")
    List<Long> findBySellerAndProductId(@Param("userId") Long userId,
            @Param("productId") Long productId);

    @Query(value = "SELECT t FROM Transaction t WHERE t.buyer.id = :userId")
    List<Transaction> findAllByBuyer(@Param("userId") Long userId);
}
