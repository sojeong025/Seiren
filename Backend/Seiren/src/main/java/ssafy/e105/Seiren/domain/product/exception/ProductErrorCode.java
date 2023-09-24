package ssafy.e105.Seiren.domain.product.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ProductErrorCode {

    CREATE_PRODUCT_ERROR(4000, "상품 등록 에러"),
    NOT_EXIST_VOICE(4001, "존재하지 않는 Voice"),
    NOT_EXIST_PRODUCT(4002, "존재하지 않는 Product"),
    NOT_EXIST_CATEGORY(4003, "존재하지 않는 Category"),
    CREATE_WiSH_ERROR(4004, "찜 등록 에러"),
    UNMACHED_PRODUCT_USER(4005, "상품 등록자, 상품 상태 변경 희망자 불일치"),
    FAIL_UPDATE_PRODUCT(4006, "상품 업데이트 실패"),
    NOT_EXIST_WISH(4007, "존재하지 않는 Wish"),
    UNMACHED_WISH_USER(4008, "찜 등록자, 찜 취소 희망자 불일치"),
    FAIL_DELETE_WISH(4009, "찜 취소 실패"),
    FAIL_GET_WISHLIST(4010, "찜 록록 불러오기 실패"),
    FAIL_SEARCH_PRODUCT(4011, "상품 검색 실패"),
    FAIL_SEARCH_PRODUCT2(4012, "상품 검색 실패2");
    private final int code;
    private final String message;

}
