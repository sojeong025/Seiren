package ssafy.e105.Seiren.domain.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.product.entity.TestHistory;

public interface TestHistoryRepository extends JpaRepository<TestHistory, Long> {

    TestHistory findCountByUser_IdAndProduct_ProductId(Long userId, Long productId);
}
