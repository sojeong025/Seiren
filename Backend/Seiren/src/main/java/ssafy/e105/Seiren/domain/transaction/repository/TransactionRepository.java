package ssafy.e105.Seiren.domain.transaction.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.transaction.entity.Transaction;
import ssafy.e105.Seiren.domain.user.entity.User;

public interface TransactionRepository extends JpaRepository<Transaction, Long> {

    Page<Transaction> findAllByBuyer(User user, Pageable pageable);


}
