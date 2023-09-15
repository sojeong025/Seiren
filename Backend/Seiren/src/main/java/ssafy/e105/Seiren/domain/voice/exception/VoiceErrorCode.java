package ssafy.e105.Seiren.domain.voice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum VoiceErrorCode {
    SCRIPT_INSERT_ERROR(3030, "Script 추가 실패"),
    NOT_EXIST_SCRIPT(3031, "존재하지 않는 Script"),
    SCRIPT_DELETE_ERROR(3032, "Script 삭제 상태 변경 실패"),
    FAIL_CREATE_VOICE(3033, "음성 생성 실패"),
    NOT_EXSIT_VOICE(3034, "존재하지 않는 Voice")
    ;

    private final int code;
    private final String message;
}