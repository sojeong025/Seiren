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
    NOT_EXSIT_VOICE(3034, "존재하지 않는 Voice"),
    UNMACHED_VOICE_USER(3035, "Voice 생성자와 사용자 id가 일치하지 않습니다."),
    FAIL_UPDATE_VOICE(3036, "Voice 업데이트 실패"),
    NO_MORE_SCRIPT(3037, "마지막 스크립트였습니다."),
    NOT_EXIST_VOICE(3038, "존재하지 않는 음성입니다."),
    EXIST_PROCESSING_VOICE(3039, "학습을 완료하지 않은 음성이 있습니다."),
    WRONG_USER(3040, "잘못된 사용자 입니다."),
    NOT_EXIST_PROCESSING_VOICE(3041, "생성 또는 학습 중인 음성이 없습니다.");

    private final int code;
    private final String message;
}