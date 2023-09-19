package ssafy.e105.Seiren.domain.product.dto;

import lombok.Data;

@Data
public class ProductDto {

    private Long productId;
    private String title;
    private String summary;
    private Double price;

}
