package ssafy.e105.Seiren.domain.product.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.product.entity.TestHistory;

public interface TestHistoryRepository extends JpaRepository<TestHistory, Long> {

    TestHistory findTestHistoryByUser_IdAndProduct_ProductId(Long userId, Long productId);

    Optional<TestHistory> findByUser_IdAndProduct_ProductId(Long userId, Long productId);
}
