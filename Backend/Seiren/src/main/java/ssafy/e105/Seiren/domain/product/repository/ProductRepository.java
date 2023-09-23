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
    @Query("SELECT DISTINCT p FROM Product p JOIN p.productCategories pc "
            + "WHERE pc.category.id IN :categoryIdList " + "ORDER BY p.createAt DESC")
    Page<Product> findProductsByCategoryIdsOrderByCreateAtDesc(
            @Param("categoryIdList") List<Long> categoryIdList, Pageable pageable);

    // nickname에 해당하는 Product 목록을 최신순으로 가져오는 쿼리
    @Query("SELECT p FROM Product p JOIN p.voice v JOIN v.user u WHERE u.nickname = :nickname ORDER BY p.createAt DESC")
    Page<Product> findAllProductByUserNickname(@Param("nickname") String nickname,
            Pageable pageable);

    // categoryIdList와 nickname에 해당하는 Product 목록을 최신순으로 가져오는 쿼리
    @Query("SELECT DISTINCT p FROM Product p " + "JOIN p.productCategories pc " + "JOIN p.voice v "
            + "JOIN v.user u " + "WHERE u.nickname = :nickname "
            + "AND pc.category.id IN :categoryIdList " + "ORDER BY p.createAt DESC")
    Page<Product> findProductsByCategoryIdsAndNicknameOrderByCreateAtDesc(
            @Param("categoryIdList") List<Long> categoryIdList, @Param("nickname") String nickname,
            Pageable pageable);

    // Product 목록을 판매순으로 가져오는 쿼리
    @Query("SELECT p, SUM(t.totalCount) AS total_count_sum " + "FROM Product p " +
            "JOIN Transaction t ON p.productId = t.product.productId " + "GROUP BY p.productId " +
            "ORDER BY total_count_sum DESC")
    Page<Product> findProductsSortedByTotalCountSum(Pageable pageable);

    // nickname에 해당하는 Product 목록을 판매순으로 가져오는 쿼리
    @Query("SELECT p, SUM(t.totalCount) AS total_count_sum " + "FROM Product p " +
            "JOIN p.voice.user u " + "JOIN Transaction t ON p.productId = t.product.productId " +
            "WHERE u.nickname = :nickname " + "GROUP BY p.productId " +
            "ORDER BY total_count_sum DESC")
    Page<Product> findProductsByNicknameSortedByTotalCountSum(@Param("nickname") String nickname,
            Pageable pageable);

    // categoryIdList에 해당하는 Product 목록을 판매순으로 가져오는 쿼리
    @Query("SELECT p, SUM(t.totalCount) AS total_count_sum " + "FROM Product p " +
            "JOIN p.productCategories pc "
            + "JOIN Transaction t ON p.productId = t.product.productId " +
            "WHERE pc.category.id IN :categoryIdList " + "GROUP BY p.productId " +
            "ORDER BY total_count_sum DESC")
    Page<Product> findProductsByCategoryAndSortByTotalCountSum(
            @Param("categoryIdList") List<Long> categoryIdList, Pageable pageable);

    // categoryIdList와 nickname에 해당하는 Product 목록을 판매순으로 가져오는 쿼리
    @Query("SELECT p, SUM(t.totalCount) AS total_count_sum " + "FROM Product p " +
            "JOIN p.productCategories pc " + "JOIN p.voice.user u " +
            "JOIN Transaction t ON p.productId = t.product.productId " +
            "WHERE u.nickname = :nickname " + "AND pc.category.id IN :categoryIdList " +
            "GROUP BY p.productId " + "ORDER BY total_count_sum DESC")
    Page<Product> findProductsByCategoryIdsAndNicknameSortedByTotalCountSum(
            @Param("categoryIdList") List<Long> categoryIdList, @Param("nickname") String nickname,
            Pageable pageable);
}