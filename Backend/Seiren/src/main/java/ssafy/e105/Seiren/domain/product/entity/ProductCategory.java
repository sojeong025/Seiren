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
import lombok.Getter;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.category.entity.Category;

//@Data
@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Builder
@IdClass(ProductCategoryId.class)
public class ProductCategory {

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;

    @Id
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    public static ProductCategory toEntity(Product product, Category category) {
        return ProductCategory.builder()
                .product(product)
                .category(category)
                .build();
    }

}
