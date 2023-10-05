package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;

@Data
public class ProductCategoryDto {

    @Schema(description = "카테고리 아이디", example = "0")
    private Long categoryId;
    @Schema(description = "카테고리명", example = "딱딱한")
    private String categoryName;

    public ProductCategoryDto(ProductCategory productCategory) {
        this.categoryId = productCategory.getCategory().getId();
        this.categoryName = productCategory.getCategory().getName();
    }
}
