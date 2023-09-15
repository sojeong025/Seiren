package ssafy.e105.Seiren.domain.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.product.entity.Wish;

public interface WishRepository extends JpaRepository<Wish, Long> {

}
