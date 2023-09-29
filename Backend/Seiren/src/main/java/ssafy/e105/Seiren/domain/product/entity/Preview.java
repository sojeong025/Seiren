package ssafy.e105.Seiren.domain.product.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.dto.ProductCreateRequest;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Preview {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long previewId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    private String previewUrl;

    private String previewText;

    public static Preview toEntity(Product product, String previewText, String previewUrl) {
        return Preview.builder()
                .product(product)
                .previewUrl(previewUrl)
                .previewText(previewText)
                .build();
    }
}
