package ssafy.e105.Seiren.domain.product.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p JOIN p.voice v JOIN v.user u WHERE u.nickname = :nickname ORDER BY p.createAt DESC")
    List<Product> findAllProductByUserNickname(@Param("nickname") String nickname);
}