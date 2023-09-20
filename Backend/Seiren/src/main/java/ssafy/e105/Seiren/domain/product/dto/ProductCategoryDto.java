package ssafy.e105.Seiren.domain.product.dto;

import lombok.Data;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;

@Data
public class ProductCategoryDto {

    private Long categoryId;
    private String categoryName;

    public ProductCategoryDto(ProductCategory productCategory) {
        this.categoryId = productCategory.getCategory().getId();
        this.categoryName = productCategory.getCategory().getName();
    }
}
