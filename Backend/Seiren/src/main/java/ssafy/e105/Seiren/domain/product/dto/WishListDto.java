package ssafy.e105.Seiren.domain.product.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import java.util.List;
import lombok.Data;

@Data
public class WishListDto {

    @Schema(description = "찜한 상품 목록", example = "ProductDto 목록")
    private List<ProductDto> wishList;

}
