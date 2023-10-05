package ssafy.e105.Seiren.domain.transaction.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TransactionTotalResponse {

    /**
     * 총 구매 목소리 갯수
     */
    private int totalNum;
}
