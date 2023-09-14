package ssafy.e105.Seiren.domain.voice.exception;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum VoiceErrorCode {
    SCRIPT_INSERT_ERROR(2030, "Script 추가 실패"),
    NOT_EXIST_SCRIPT(2031, "존재하지 않는 Script"),
    SCRIPT_DELETE_ERROR(2032, "Script 삭제 상태 변경 실패");

    private final int code;
    private final String message;
}