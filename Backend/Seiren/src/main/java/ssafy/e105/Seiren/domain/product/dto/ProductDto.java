package ssafy.e105.Seiren.domain.product.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.entity.Product;

@Data
@NoArgsConstructor
public class ProductDto {

    private Long productId;
    private String title;
    private String summary;
    private String productImageUrl;
    private Double price;
    private List<ProductCategoryDto> productCategoryList;

    public ProductDto(Product product, List<ProductCategoryDto> productCategoryDtoList) {
        this.productId = product.getProductId();
        this.title = product.getProductTitle();
        this.summary = product.getSummary();
        this.productImageUrl = product.getProductImageUrl();
        this.price = product.getPrice();
        this.productCategoryList = productCategoryDtoList;
    }

}
