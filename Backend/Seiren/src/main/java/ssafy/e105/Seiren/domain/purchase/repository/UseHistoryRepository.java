package ssafy.e105.Seiren.domain.purchase.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.purchase.entity.BuyPurpose;
import ssafy.e105.Seiren.domain.purchase.entity.PurchaseProduct;
import ssafy.e105.Seiren.domain.purchase.entity.UseHistory;

import java.util.List;
import java.util.Optional;

public interface UseHistoryRepository extends JpaRepository<UseHistory, Long> {

    List<UseHistory> findAllByPurchaseProduct(PurchaseProduct purchaseProduct);
}
