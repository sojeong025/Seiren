package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;

@Data
public class ProductSearchRequest {

    @Schema(description = "판매자 닉네임", example = "재키")
    private String nickname;
    @Schema(description = "카테고리 Id 목록", example = "3, 8")
    private List<Long> categoryIdList;
    @Schema(description = "정렬 방법", example = "Latest(:최신순),Sales(:판매순) 둘 중 하나 입력 -> 예시: Latest")
    private String sortType;
}
