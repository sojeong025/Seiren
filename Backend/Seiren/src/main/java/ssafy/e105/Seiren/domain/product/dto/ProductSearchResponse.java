package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;

@Data
public class ProductSearchResponse {

    @Schema(description = "총 페이지 수", example = "3")
    private int totalPageNum;
    @Schema(description = "검색된 상품 목록", example = "ProductDto")
    private List<ProductDto> productDtoList;

    public ProductSearchResponse(List<ProductDto> productDtoList, int totalPageNum) {
        this.totalPageNum = totalPageNum;
        this.productDtoList = productDtoList;
    }
}
