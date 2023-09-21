package ssafy.e105.Seiren.domain.transaction.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.transaction.entity.TransactionDescription;

public interface TransactionDescriptionRepository extends
        JpaRepository<TransactionDescription, Long> {

}
