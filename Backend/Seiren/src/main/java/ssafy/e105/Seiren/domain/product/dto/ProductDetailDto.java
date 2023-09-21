package ssafy.e105.Seiren.domain.product.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.entity.Product;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

@Data
@NoArgsConstructor
public class ProductDetailDto {

    private String productTitle;
    private String productImageUrl;
    private String summary;
    private String nickname;
    private List<String> productCategoryList;

    public ProductDetailDto(Product product, Voice voice, List<String> categoryList) {
        this.productTitle = product.getProductTitle();
        this.productImageUrl = product.getProductImageUrl();
        this.summary = product.getSummary();
        this.nickname = voice.getUser().getNickname();
        this.productCategoryList = categoryList;
    }
}
