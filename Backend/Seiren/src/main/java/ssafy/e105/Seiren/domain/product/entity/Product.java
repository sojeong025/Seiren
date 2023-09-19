package ssafy.e105.Seiren.domain.product.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.dto.ProductCreateRequest;
import ssafy.e105.Seiren.domain.product.dto.ProductUpdateDto;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

@Data
@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long productId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "voice_id")
    private Voice voice;

    private String productTitle;

    private String summary;

    private Double price;

    private LocalDateTime createAt;

    private LocalDateTime updatedAt;

    private Boolean state;

    @OneToMany(mappedBy = "product")
    private List<TestHistory> testHistories = new ArrayList<>();

    @OneToMany(mappedBy = "product")
    private List<ProductCategory> productCategories = new ArrayList<>();

    public static Product toEntity(ProductCreateRequest productCreateRequest, Voice voice) {
        return Product.builder()
                .voice(voice)
                .productTitle(productCreateRequest.getProductTitle())
                .summary(productCreateRequest.getSummary())
                .price(productCreateRequest.getPrice())
                .createAt(LocalDateTime.now())
                .state(true)
                .build();
    }

    public void update(Boolean state) {
        this.state = state;
    }

    public void update(ProductUpdateDto productUpdateDto) {
        this.productTitle = productUpdateDto.getProductTitle();
        this.summary = productUpdateDto.getSummary();
        this.price = productUpdateDto.getPrice();
        this.updatedAt = LocalDateTime.now();
    }
}
