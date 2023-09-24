package ssafy.e105.Seiren.domain.transaction.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;
import ssafy.e105.Seiren.domain.payment.dto.PurchaseDto;
import ssafy.e105.Seiren.domain.product.entity.Product;

@Builder
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class TransactionDescription {

    @Id
    @GeneratedValue
    @Column(name = "transaction_description_id")
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "transaction_id")
    private Transaction transaction;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "purpose_id")
    private Purpose purpose;

    private String productTitle;

    private String summary;

    private Double price;

    private LocalDateTime buyDate;

    private int buyLetterCount;


    public static TransactionDescription toEntity(PurchaseDto purchaseDto, Transaction transaction,
            Purpose purpose, Product product) {
        return TransactionDescription.builder()
                .transaction(transaction)
                .purpose(purpose)
                .productTitle(product.getProductTitle())
                .summary(product.getSummary())
                .price(product.getPrice())
                .buyDate(LocalDateTime.now())
                .buyLetterCount(purchaseDto.getBuyLetterCount())
                .build();
    }
}
