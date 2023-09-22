package ssafy.e105.Seiren.domain.transaction.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import ssafy.e105.Seiren.domain.transaction.entity.Purpose;
import ssafy.e105.Seiren.domain.transaction.entity.Transaction;
import ssafy.e105.Seiren.domain.transaction.entity.TransactionDescription;

import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TransactionProductReceiptResponse {

    private String seller;

    private String productTitle;

    private Double price;

    private LocalDateTime buyDate;

    private int buyLetterCount;

    private Double totalPrice;

    public static TransactionProductReceiptResponse toDto(TransactionDescription transactionDescription){
        return TransactionProductReceiptResponse.builder()
                .productTitle(transactionDescription.getProductTitle())
                .price(transactionDescription.getPrice())
                .buyDate(transactionDescription.getBuyDate())
                .buyLetterCount(transactionDescription.getBuyLetterCount())
                .build();
    }

}
