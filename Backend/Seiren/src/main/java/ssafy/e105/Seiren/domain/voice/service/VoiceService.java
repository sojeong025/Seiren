package ssafy.e105.Seiren.domain.voice.service;

import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.FAIL_CREATE_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXSIT_VOICE;

import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.domain.voice.dto.VoiceUpdateDto;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
public class VoiceService {

    private final VoiceRepository voiceRepository;
    private final UserService userService;

    public Long addVoice(HttpServletRequest request) {
        User user = userService.getUser(request);
        try {
            Voice voice = Voice.toEntity(user);
            return voiceRepository.save(voice).getVoiceId();
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_CREATE_VOICE.getMessage(), FAIL_CREATE_VOICE.getCode()));
        }
    }

    public void updateVoice(HttpServletRequest request, VoiceUpdateDto voiceUpdateDto) {
        User user = userService.getUser(request);
        Voice voice = getVoice(voiceUpdateDto.getVoiceId());
        try {

        } catch (Exception e) {
            throw new BaseException(new ApiError("", 0));
        }
    }

    public Voice getVoice(Long voiceId) {
        return voiceRepository.findById(voiceId).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXSIT_VOICE.getMessage(), NOT_EXSIT_VOICE.getCode())));
    }
}
