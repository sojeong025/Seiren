package ssafy.e105.Seiren.domain.payment.dto;

import lombok.Data;

@Data
public class PurchaseDto {

    private Long productId;
    private Integer buyLetterCount;
    private Long purposeId;

}
