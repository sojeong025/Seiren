package ssafy.e105.Seiren.domain.product.dto;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class TestTTSRequest {

    @Size(min = 1, max = 20, message = "테스트 문장은 1자 이상 20자 이하여야합니다.")
    private String text;

}
