package ssafy.e105.Seiren.domain.product.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @Query("SELECT p FROM Product p ORDER BY p.createAt DESC")
    List<Product> findAllProductsOrderByCreateAtDesc();

    @Query("SELECT DISTINCT p FROM Product p JOIN p.productCategories pc "
            + "WHERE pc.category.id IN :categoryIdList " + "ORDER BY p.createAt DESC")
    List<Product> findProductsByCategoryIdsOrderByCreateAtDesc(
            @Param("categoryIdList") List<Long> categoryIdList);

    @Query("SELECT p FROM Product p JOIN p.voice v JOIN v.user u WHERE u.nickname = :nickname ORDER BY p.createAt DESC")
    List<Product> findAllProductByUserNickname(@Param("nickname") String nickname);

    // categoryIdList와 nickname에 해당하는 Product 목록을 최신순으로 가져오는 메서드
    @Query("SELECT DISTINCT p FROM Product p " + "JOIN p.productCategories pc " + "JOIN p.voice v "
            + "JOIN v.user u " + "WHERE u.nickname = :nickname "
            + "AND pc.category.id IN :categoryIdList " + "ORDER BY p.createAt DESC")
    List<Product> findProductsByCategoryIdsAndNicknameOrderByCreateAtDesc(
            @Param("categoryIdList") List<Long> categoryIdList, @Param("nickname") String nickname);
}