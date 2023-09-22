package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PreviewDto {

    @Schema(description = "미리듣기 파일 url", example = "https://t1.daumcdn.net/cfile/tistory/24283C3858F778CA2E")
    private List<String> previewUrls;

    public PreviewDto(List<String> previewUrls) {
        this.previewUrls = previewUrls;
    }
}
