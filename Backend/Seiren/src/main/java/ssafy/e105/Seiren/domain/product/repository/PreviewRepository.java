package ssafy.e105.Seiren.domain.product.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.product.entity.Preview;

public interface PreviewRepository extends JpaRepository<Preview, Long> {

    List<Preview> findAllByProductId(Long productId);
}
