package ssafy.e105.Seiren.domain.purchase.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UseHistory {

    @Id
    @GeneratedValue
    @Column(name = "user_history_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "purchase_product_id")
    private PurchaseProduct purchaseProduct;

    private String text;

    private String fileUrl;

    private Long characterCount;

    private LocalDateTime createdAt;


}
