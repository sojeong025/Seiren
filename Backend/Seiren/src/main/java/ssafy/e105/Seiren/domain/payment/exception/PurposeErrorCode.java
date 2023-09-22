package ssafy.e105.Seiren.domain.payment.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum PurposeErrorCode {

    NOT_EXIST_PURPOSE(6000, "존재하지 않는 Purpose");
    private final int code;
    private final String message;
}
