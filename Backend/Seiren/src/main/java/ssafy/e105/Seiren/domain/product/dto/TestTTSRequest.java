package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TestTTSRequest {
    
    @Schema(description = "상품 id", example = "1")
    private Long productId;

}
