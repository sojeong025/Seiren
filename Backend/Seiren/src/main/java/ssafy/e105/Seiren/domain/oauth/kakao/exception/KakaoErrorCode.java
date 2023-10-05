package ssafy.e105.Seiren.domain.oauth.kakao.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum KakaoErrorCode {
    KAKAO_CODE_ERROR_CODE(2000, "카카오 코드 에러"),
    KAKAO_TOKEN_ERROR_CODE(2001, "카카오 엑세스 토큰 에러"),
    KAKAO_LOGIN_ERROR_CODE(2002, "카카오 로그인 에러");

    private final int code;
    private final String message;

}
