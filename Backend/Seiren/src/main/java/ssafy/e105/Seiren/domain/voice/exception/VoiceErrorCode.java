package ssafy.e105.Seiren.domain.voice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum VoiceErrorCode {

    SERVER_ERROR(500, "서버 에러");

    private final int code;
    private final String message;
}