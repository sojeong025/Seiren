package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TestTTSRequest {

    @Schema(description = "테스트 TTS 문장", example = "오늘 점심 메뉴는 뭐야?")
    @Size(min = 1, max = 20, message = "테스트 문장은 1자 이상 20자 이하여야합니다.")
    private String text;

}
