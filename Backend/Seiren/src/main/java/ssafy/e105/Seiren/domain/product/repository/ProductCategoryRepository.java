package ssafy.e105.Seiren.domain.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;

public interface ProductCategoryRepository extends JpaRepository<ProductCategory, Long> {

}
