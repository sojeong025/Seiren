package ssafy.e105.Seiren.domain.transaction.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

@Data
public class PurposeCreateRequest {

    @Schema(description = "구매 목적명", example = "게임")
    private String purposeName;
}
