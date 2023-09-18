package ssafy.e105.Seiren.domain.purchase.entity;

import jakarta.persistence.*;
import lombok.*;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.user.entity.User;

import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseProduct {

    @Id
    @GeneratedValue
    @Column(name = "purchase_product_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private User buyer;

    @ManyToOne
    @JoinColumn(name = "product_id")
    private Product product;

    private String productTitle;

    private String summary;

    private Long price;

    private Long letterNum;

    private LocalDateTime buyDate;

    @ManyToOne
    @JoinColumn(name = "buy_purpose_id")
    private BuyPurpose buyPurpose;

}
