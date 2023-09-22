package ssafy.e105.Seiren.domain.transaction.repository;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.transaction.entity.Transaction;
import ssafy.e105.Seiren.domain.user.entity.User;

import java.util.Optional;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findAllByBuyer(User user, Pageable pageable);

    Transaction findTransactionByProduct_ProductIdAndSeller_Id(Long productId, Long sellerId);

    Optional<Transaction> findByBuyerAndProduct(User user, Product product);

}
