package ssafy.e105.Seiren.domain.payment.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class PurchaseDto {

    @Schema(description = "상품 id", example = "1")
    private Long productId;
    @Schema(description = "구매 글자수", example = "1000")
    private Integer buyLetterCount;
    @Schema(description = "구매 목적 id", example = "1")
    private Long purposeId;

}
