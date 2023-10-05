package ssafy.e105.Seiren.domain.category.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum CategoryErrorCode {

    CATEGORY_READ_ERROR(5000, "카테고리를 읽어올 수 없습니다."),
    CATEGORY_CREATE_ERROR(5001, "카테고리 추가 에러")
    ;
    private final int code;
    private final String message;
}
