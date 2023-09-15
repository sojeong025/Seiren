package ssafy.e105.Seiren.domain.product.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductCreateRequest {

    private Long voiceId;
    private String productTitle;
    private String summary;
    private Double price;
    private List<String> previewTexts;
    // 상품 카테고리 목록 코드 추가
}
