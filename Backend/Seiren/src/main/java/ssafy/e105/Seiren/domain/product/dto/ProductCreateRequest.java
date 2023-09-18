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
    private Double price;
    private List<String> previewTexts;
    private List<Long> categoryList;
}
