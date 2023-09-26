package ssafy.e105.Seiren.domain.product.dto;

import java.time.LocalDateTime;
import java.util.Arrays;
import lombok.Data;
import ssafy.e105.Seiren.domain.transaction.entity.TransactionDescription;

@Data
public class ProductStatisticsDetailDto {

    private String nickname;
    private int buyLetterCount;
    private Double price;
    private String purposeName;
    private LocalDateTime buyDate;

    public ProductStatisticsDetailDto(TransactionDescription transactionDescription) {
        String originalNickname = transactionDescription.getTransaction().getBuyer().getNickname();
        if (originalNickname != null && originalNickname.length() > 1) {
            char firstChar = originalNickname.charAt(0);
            char[] maskedChars = new char[originalNickname.length() - 1];
            Arrays.fill(maskedChars, '*');
            this.nickname = firstChar + new String(maskedChars);
        } else {
            this.nickname = originalNickname;
        }
        this.buyLetterCount = transactionDescription.getBuyLetterCount();
        this.price = transactionDescription.getPrice();
        this.purposeName = transactionDescription.getPurpose().getPurposeName();
        this.buyDate = transactionDescription.getBuyDate();
    }

}
