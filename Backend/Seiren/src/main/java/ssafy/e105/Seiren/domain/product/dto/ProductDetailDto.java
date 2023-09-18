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
    private String avatarUrl;
    private String summary;
    private String nickname;
    private List<String> productCategoryList;

    public ProductDetailDto(Product product, Voice voice, User user, List<String> categoryList) {
        this.productTitle = product.getProductTitle();
        this.avatarUrl = voice.getVoiceAvatarUrl();
        this.summary = product.getSummary();
        this.nickname = user.getNickname();
        this.productCategoryList = categoryList;
    }
}
