package ssafy.e105.Seiren.domain.product.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.product.entity.TestHistory;

public interface TestHistoryRepository extends JpaRepository<TestHistory, Long> {

    TestHistory findTestHistoryByUser_IdAndProduct_ProductId(Long userId, Long productId);

    @Query("SELECT th FROM TestHistory th WHERE th.user.id = :userId AND th.product.productId = :productId")
    Optional<TestHistory> findByUser_IdAndProduct_ProductId(@Param("userId") Long userId,@Param("productId") Long productId);
}
