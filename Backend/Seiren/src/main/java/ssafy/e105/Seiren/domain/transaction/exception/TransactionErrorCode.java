package ssafy.e105.Seiren.domain.transaction.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum TransactionErrorCode {

    NOT_EXIST_TRANSACTION(5000, "거래 상품이 존재하지 않습니다."),
    OVER_RESTCOUNT(5001, "텍스트의 길이가 남은 글자수 보다 많습니다.")
    ;
    private final int code;
    private final String message;
}
