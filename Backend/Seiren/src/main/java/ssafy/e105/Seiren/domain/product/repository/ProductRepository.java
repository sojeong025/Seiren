package ssafy.e105.Seiren.domain.product.repository;

import java.util.List;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.product.entity.Product;

public interface ProductRepository extends JpaRepository<Product, Long> {

    // Product 목록을 최신순으로 가져오는 쿼리
    @Query("SELECT p FROM Product p ORDER BY p.createAt DESC")
    Page<Product> findAllProductsOrderByCreateAtDesc(Pageable pageable);

    // categoryIdList에 해당하는 Product 목록을 최신순으로 가져오는 쿼리
    @Query("SELECT DISTINCT p FROM Product p JOIN p.productCategories pc WHERE pc.category.id IN :categoryIdList ORDER BY p.createAt DESC")
    Page<Product> findProductsByCategoryIdsOrderByCreateAtDesc(
            @Param("categoryIdList") List<Long> categoryIdList, Pageable pageable);

    // nickname에 해당하는 Product 목록을 최신순으로 가져오는 쿼리
    @Query("SELECT p FROM Product p JOIN p.voice v JOIN v.user u WHERE u.nickname = :nickname ORDER BY p.createAt DESC")
    Page<Product> findAllProductByUserNickname(@Param("nickname") String nickname,
            Pageable pageable);

    // categoryIdList와 nickname에 해당하는 Product 목록을 최신순으로 가져오는 쿼리
    @Query("SELECT DISTINCT p FROM Product p JOIN p.productCategories pc JOIN p.voice v JOIN v.user u "
            + "WHERE u.nickname = :nickname AND pc.category.id IN :categoryIdList ORDER BY p.createAt DESC")
    Page<Product> findProductsByCategoryIdsAndNicknameOrderByCreateAtDesc(
            @Param("categoryIdList") List<Long> categoryIdList, @Param("nickname") String nickname,
            Pageable pageable);

    // Product 목록을 판매순으로 가져오는 쿼리
    @Query("SELECT p FROM Product p LEFT JOIN Transaction t ON p.productId = t.product.productId " +
            "GROUP BY p ORDER BY COUNT(t) DESC")
    Page<Product> findAllOrderByTransactionCountDesc(Pageable pageable);

    // nickname에 해당하는 Product 목록을 판매순으로 가져오는 쿼리
    @Query("SELECT p FROM Product p LEFT JOIN p.voice.user u LEFT JOIN Transaction t ON p.productId = t.product.productId "
            + "WHERE u.nickname = :nickname GROUP BY p ORDER BY COUNT(t) DESC")
    Page<Product> findAllByNicknameOrderByTransactionCountDesc(@Param("nickname") String nickname,
            Pageable pageable);

    // categoryIdList에 해당하는 Product 목록을 판매순으로 가져오는 쿼리
    @Query("SELECT p FROM Product p LEFT JOIN p.productCategories pc LEFT JOIN Transaction t ON p.productId = t.product.productId "
            + "WHERE pc.category.id IN :categoryIdList GROUP BY p ORDER BY COUNT(t) DESC")
    Page<Product> findAllByCategoryOrderByTransactionCountDesc(
            @Param("categoryIdList") List<Long> categoryIdList, Pageable pageable);

    // categoryIdList와 nickname에 해당하는 Product 목록을 판매순으로 가져오는 쿼리
    @Query("SELECT p FROM Product p LEFT JOIN p.productCategories pc LEFT JOIN p.voice.user u LEFT JOIN Transaction t ON p.productId = t.product.productId "
            + "WHERE u.nickname = :nickname AND pc.category.id IN :categoryIdList GROUP BY p ORDER BY COUNT(t) DESC")
    Page<Product> findAllByCategoryIdsAndNicknameOrderByTransactionCountDesc(
            @Param("categoryIdList") List<Long> categoryIdList, @Param("nickname") String nickname,
            Pageable pageable);

    Product findByProductId(Long productId);

    Product findByVoiceId(Long voiceId);

}