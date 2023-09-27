package ssafy.e105.Seiren.domain.transaction.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TransactionProductDetailResponse {

    private Long transactionId;
    private String productImageUrl;
    private String productTitle;
    private List<String> productCategories;
    private String summary;
    private int remainLetter;
    private int totalCount;
}
