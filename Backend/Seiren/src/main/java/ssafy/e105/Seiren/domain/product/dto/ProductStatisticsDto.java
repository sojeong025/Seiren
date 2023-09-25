package ssafy.e105.Seiren.domain.product.dto;

import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.entity.Product;

@Data
@NoArgsConstructor
public class ProductStatisticsDto {

    private Long productId;
    private String productTitle;
    private String productImageUrl;
    private int totalSumCount;

    public ProductStatisticsDto(Product product, int totalSumCount) {
        this.productId = product.getProductId();
        this.productTitle = product.getProductTitle();
        this.productImageUrl = product.getProductImageUrl();
        this.totalSumCount = totalSumCount;
    }

}
