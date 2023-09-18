package ssafy.e105.Seiren.domain.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.user.entity.User;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@IdClass(TestHistoryId.class)
public class TestHistory {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private int count;

    public static TestHistory toEntity(User user, Product product) {
        return TestHistory.builder()
                .user(user)
                .product(product)
                .count(3)
                .build();
    }
}
