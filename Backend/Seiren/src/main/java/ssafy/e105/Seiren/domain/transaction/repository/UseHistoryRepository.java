package ssafy.e105.Seiren.domain.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.transaction.entity.Transaction;
import ssafy.e105.Seiren.domain.transaction.entity.UseHistory;

import java.util.List;

public interface UseHistoryRepository extends JpaRepository<UseHistory, Long> {

    List<UseHistory> findAllByTransaction(Transaction transaction);
}
