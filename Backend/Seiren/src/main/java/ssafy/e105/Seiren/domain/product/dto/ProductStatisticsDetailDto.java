package ssafy.e105.Seiren.domain.product.dto;

import java.time.LocalDateTime;
import lombok.Data;
import ssafy.e105.Seiren.domain.transaction.entity.TransactionDescription;

//- 구매자 닉네임(뒷 n글자 ‘*’ 처리), 판매 글자 수, 글자 별 판매 금액, 구매자의 구매 목적, 일자
@Data
public class ProductStatisticsDetailDto {

    private String nickname;
    private int buyLetterCount;
    private Double price;
    private String purposeName;
    private LocalDateTime buyDate;

    public ProductStatisticsDetailDto(TransactionDescription transactionDescription) {
        this.nickname = transactionDescription.getTransaction().getBuyer().getNickname();
        this.buyLetterCount = transactionDescription.getBuyLetterCount();
        this.price = transactionDescription.getPrice();
        this.purposeName = transactionDescription.getPurpose().getPurposeName();
        this.buyDate = transactionDescription.getBuyDate();
    }

}
