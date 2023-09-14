package ssafy.e105.Seiren.domain.user.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum UserErrorCode {

    LOGIN_ERROR(1000, "로그인 에러"),
    REGISTER_ERROR(1001, "회원가입 에러"),
    NICKNAME_UNMATCHED_FORMAT(1002, "닉네임 정규 표현식 에러"),
    EXIST_NICKNAME(1003, "존재하는 닉네임"),
    UPDATE_NICKNAME_ERROR(1004, "닉네임 업데이트 중 에러"),
    NOT_EXIST_USER(1005,"존재하지 않는 사용자 에러"),
    UPDATE_PROFILE_IMG_ERROR(1006, "프로필 사진 업데이트 중 에러")
    ;
    private final int code;
    private final String message;
}
