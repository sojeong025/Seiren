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
    private String productImageUrl;     // 실제론 파일 형식 입력 받아 s3에 저장 후 변경
    private Double price;
    private List<String> previewTexts;
    private List<Long> categoryList;
}
