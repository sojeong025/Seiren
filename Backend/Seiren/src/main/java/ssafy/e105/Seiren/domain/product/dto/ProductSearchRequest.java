package ssafy.e105.Seiren.domain.product.dto;

import java.util.List;
import lombok.Data;

@Data
public class ProductSearchRequest {

    private String nickname;
    private List<Long> categoryIdList;
    private String sortType;
}
