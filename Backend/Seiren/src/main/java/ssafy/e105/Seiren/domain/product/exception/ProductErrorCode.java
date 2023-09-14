package ssafy.e105.Seiren.domain.product.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProductErrorCode {

    CREATE_PRODUCT_ERROR(2000,"상품 등록 에러");
    private final int code;
    private final String message;

}
