package ssafy.e105.Seiren.domain.product.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProductErrorCode {

    CREATE_PRODUCT_ERROR(4000, "상품 등록 에러"),
    NOT_EXIST_VOICE(4001, "존재하지 않는 Voice"),
    NOT_EXIST_PRODUCT(4002, "존재하지 않는 Product"),
    CREATE_WiSH_ERROR(4003, "찜 등록 에러");
    private final int code;
    private final String message;

}
