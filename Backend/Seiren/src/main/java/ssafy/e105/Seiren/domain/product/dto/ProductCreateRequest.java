package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ProductCreateRequest {

    @Schema(description = "목소리 id", example = "1")
    private Long voiceId;
    @Schema(description = "상품명", example = "김밤")
    private String productTitle;
    @Schema(description = "상품 요약", example = "참치 김밥")
    private String summary;
    @Schema(description = "상품 이미지 url", example = "https://recipe1.ezmember.co.kr/cache/recipe/2018/12/14/4cde7fc3e79989e982dd00e6891939d81.jpg")
    private String productImageUrl;     // 실제론 파일 형식 입력 받아 s3에 저장 후 변경
    @Schema(description = "상품 가격", example = "10")
    private Double price;
    @Schema(description = "미리듣기 텍스트 3문장", example = "[\"문장1\", \"문장2\", \"문장3\"]")
    private List<String> previewTexts;
    @Schema(description = "카테고리 id 목록", example = "5, 8")
    private List<Long> categoryList;
}
