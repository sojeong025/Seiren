package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class ProductUpdateDto {

    @Schema(description = "상품 id", example = "1")
    private Long productId;
    @Schema(description = "상품명", example = "김밤")
    private String productTitle;
    @Schema(description = "상품 요약", example = "참치 김밥")
    private String summary;
    @Schema(description = "상품 이미지 url", example = "https://recipe1.ezmember.co.kr/cache/recipe/2018/12/14/4cde7fc3e79989e982dd00e6891939d81.jpg")
    private String productImageUrl;      // 추후 파일로 받는걸롭 변경
    @Schema(description = "상품 가격", example = "10")
    private Double price;

}
