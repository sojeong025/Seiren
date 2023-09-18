package ssafy.e105.Seiren.domain.purchase.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.purchase.entity.PurchaseProduct;
import ssafy.e105.Seiren.domain.user.entity.User;

public interface PurchaseRepository extends JpaRepository<PurchaseProduct, Long> {

    Page<PurchaseProduct> findAllByBuyer(User user, Pageable pageable);

}
