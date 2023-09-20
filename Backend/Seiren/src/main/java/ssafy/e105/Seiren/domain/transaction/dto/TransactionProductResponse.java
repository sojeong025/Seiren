package ssafy.e105.Seiren.domain.transaction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionProductResponse {
    // 상품 아바타, 상품 타이틀, 카테고리
    // 남은 글자수 / 구매 글자수
    private String voiceAvatarUrl;
    private String productTitle;
    private List<ProductCategory> productCategories;
    private int remainLetter;
    private int totalCount;
}
