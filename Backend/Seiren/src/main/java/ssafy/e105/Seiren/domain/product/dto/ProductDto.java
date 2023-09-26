package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.entity.Product;

@Data
@NoArgsConstructor
public class ProductDto {

    @Schema(description = "상품 id", example = "1")
    private Long productId;
    @Schema(description = "판매자 닉네임", example = "재키")
    private String nickname;
    @Schema(description = "상품명", example = "김밤")
    private String title;
    @Schema(description = "상품 요약", example = "참치 김밥")
    private String summary;
    @Schema(description = "상품 이미지 url", example = "https://recipe1.ezmember.co.kr/cache/recipe/2018/12/14/4cde7fc3e79989e982dd00e6891939d81.jpg")
    private String productImageUrl;
    @Schema(description = "상품 가격", example = "10")
    private Double price;
    @Schema(description = "상품 카테고리 목록", example = "딱딱한, 청년")
    private List<ProductCategoryDto> productCategoryList;
    @Schema(description = "찜 여부", example = "true")
    private boolean wish;

    public ProductDto(Product product, List<ProductCategoryDto> productCategoryDtoList,
            boolean wish) {
        this.productId = product.getProductId();
        this.nickname = product.getVoice().getUser().getNickname();
        this.title = product.getProductTitle();
        this.summary = product.getSummary();
        this.productImageUrl = product.getProductImageUrl();
        this.price = product.getPrice();
        this.productCategoryList = productCategoryDtoList;
        this.wish = wish;
    }
}
