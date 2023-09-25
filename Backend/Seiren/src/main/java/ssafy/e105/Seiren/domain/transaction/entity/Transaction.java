package ssafy.e105.Seiren.domain.transaction.entity;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import ssafy.e105.Seiren.domain.payment.dto.PurchaseDto;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.user.entity.User;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Transaction {

    @Id
    @GeneratedValue
    @Column(name = "transaction_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "seller_id")
    private User seller;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "buyer_id")
    private User buyer;

    private int totalCount;

    private int restCount;

    public static Transaction toEntity(Product product, User seller, User buyer,
            PurchaseDto purchaseDto) {
        return Transaction.builder()
                .product(product)
                .seller(seller)
                .buyer(buyer)
                .totalCount(purchaseDto.getBuyLetterCount())
                .restCount(purchaseDto.getBuyLetterCount())
                .build();
    }

    public void update(PurchaseDto purchaseDto) {
        this.totalCount += purchaseDto.getBuyLetterCount();
        this.restCount += purchaseDto.getBuyLetterCount();
    }

    public void minusRestCount(int textLength) {
        this.restCount = this.restCount - textLength;
    }

}
