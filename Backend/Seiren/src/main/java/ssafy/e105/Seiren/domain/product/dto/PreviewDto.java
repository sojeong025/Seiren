package ssafy.e105.Seiren.domain.product.dto;

import java.util.List;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class PreviewDto {

    private List<String> previewUrls;

    public PreviewDto(List<String> previewUrls) {
        this.previewUrls = previewUrls;
    }
}
