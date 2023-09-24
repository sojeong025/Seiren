package ssafy.e105.Seiren.domain.transaction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.product.entity.ProductCategory;

import java.util.List;

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
