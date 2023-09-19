package ssafy.e105.Seiren.domain.purchase.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@Entity
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
