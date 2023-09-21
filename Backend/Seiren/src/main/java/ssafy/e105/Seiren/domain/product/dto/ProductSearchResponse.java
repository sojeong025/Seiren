package ssafy.e105.Seiren.domain.product.dto;

import java.util.List;
import lombok.Data;

@Data
public class ProductSearchResponse {

    private List<ProductDto> productDtoList;

    public ProductSearchResponse(List<ProductDto> productDtoList) {
        this.productDtoList = productDtoList;
    }
}
