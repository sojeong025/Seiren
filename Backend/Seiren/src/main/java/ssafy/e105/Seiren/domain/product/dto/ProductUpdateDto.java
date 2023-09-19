package ssafy.e105.Seiren.domain.product.dto;

import lombok.Data;

@Data
public class ProductUpdateDto {

    private Long productId;
    private String productTitle;
    private String summary;
    private Double price;
    private String voiceAvatarUrl;      // 추후 파일로 받는걸롭 변경

}
