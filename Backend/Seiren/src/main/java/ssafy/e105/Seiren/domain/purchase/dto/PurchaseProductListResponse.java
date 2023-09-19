package ssafy.e105.Seiren.domain.purchase.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.category.entity.Category;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;
import ssafy.e105.Seiren.domain.purchase.entity.PurchaseProduct;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class PurchaseProductListResponse {

    /**
     * voice에 있는 아바타사진
     */
    private String voiceAvatarUrl;

    /**
     * product에 있는 상품 타이틀
     */
    private String productTitle;

    /**
     * 카테고리 리스트
     */
    private List<ProductCategory> categoryList;

    /**
     * 남은 글자수
     */
    private Long remainletter;

    /**
     * 총 글자수
     */
    private Long letternum;

    /**
     * entity -> dto
     */
    public static PurchaseProductListResponse purchaseProductToDto(PurchaseProduct purchaseProduct){
        return PurchaseProductListResponse.builder()
                .voiceAvatarUrl(purchaseProduct.getProduct().getVoice().getVoiceAvatarUrl())
                .productTitle(purchaseProduct.getProductTitle())
                .letternum(purchaseProduct.getLetterNum())
                .letternum(purchaseProduct.getLetterNum())
                .build();
    }



}
