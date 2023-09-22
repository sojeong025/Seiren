package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

@Data
@NoArgsConstructor
public class ProductDetailDto {

    @Schema(description = "상품명", example = "김밤")
    private String productTitle;
    @Schema(description = "상품 이미지 url", example = "https://recipe1.ezmember.co.kr/cache/recipe/2018/12/14/4cde7fc3e79989e982dd00e6891939d81.jpg")
    private String productImageUrl;
    @Schema(description = "상품 요약", example = "참치 김밥")
    private String summary;
    @Schema(description = "판매자 닉네임", example = "재키")
    private String nickname;
    @Schema(description = "상품 카테고리 목록", example = "딱딱한, 청년")
    private List<String> productCategoryList;

    public ProductDetailDto(Product product, Voice voice, List<String> categoryList) {
        this.productTitle = product.getProductTitle();
        this.productImageUrl = product.getProductImageUrl();
        this.summary = product.getSummary();
        this.nickname = voice.getUser().getNickname();
        this.productCategoryList = categoryList;
    }
}
