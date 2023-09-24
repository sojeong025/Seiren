package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;

@Data
public class ProductSearchResponse {

    @Schema(description = "검색된 상품 목록", example = "ProductDto")
    private List<ProductDto> productDtoList;

    public ProductSearchResponse(List<ProductDto> productDtoList) {
        this.productDtoList = productDtoList;
    }
}
