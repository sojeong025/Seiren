package ssafy.e105.Seiren.domain.voice.service;

import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.FAIL_CREATE_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.FAIL_UPDATE_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXSIT_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.UNMACHED_VOICE_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.domain.voice.dto.VoiceDto;
import ssafy.e105.Seiren.domain.voice.dto.VoiceUpdateDto;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VoiceService {

    private final VoiceRepository voiceRepository;
    private final UserService userService;

    public List<VoiceDto> getVoiceList(HttpServletRequest request) {
        List<Voice> voiceList = voiceRepository.findByUser_Id(userService.getUser(request).getId());
        return voiceList.stream()
                .map(voice -> {
                    Integer state = Optional.ofNullable(voice.getProduct())
                            .map(product -> product.getState() ? 1 : 2)
                            .orElse(0); //0:등록X, 1:등록&판매, 2:등록&판매중지
                    return new VoiceDto(voice.getVoiceId(), voice.getVoiceTitle(),
                            voice.getVoiceAvatarUrl(),
                            voice.getCreatedAt(), state);
                })
                .collect(Collectors.toList());
    }

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

    @Transactional
    public void updateVoice(HttpServletRequest request, VoiceUpdateDto voiceUpdateDto) {
        User user = userService.getUser(request);
        Voice voice = getVoice(voiceUpdateDto.getVoiceId());
        try {
            if (voice.getUser() == user) {
                voice.update(voiceUpdateDto);
//                voiceRepository.save(voice);
                return;
            }
            // voice 보유 유저 id와 업데이트 요청을 한 유저 id가 일치하지 않을 시 에러 처리
            throw new BaseException(
                    new ApiError(UNMACHED_VOICE_USER.getMessage(), UNMACHED_VOICE_USER.getCode()));
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_UPDATE_VOICE.getMessage(), FAIL_UPDATE_VOICE.getCode()));
        }
    }

    @Transactional
    public void updateVoiceMemo(HttpServletRequest request, VoiceUpdateDto voiceUpdateDto) {
        User user = userService.getUser(request);
        Voice voice = getVoice(voiceUpdateDto.getVoiceId());
        try {
            if (voice.getUser() == user) {
                voice.update(voiceUpdateDto.getMemo());
                return;
            }
            // voice 보유 유저 id와 업데이트 요청을 한 유저 id가 일치하지 않을 시 에러 처리
            throw new BaseException(
                    new ApiError(UNMACHED_VOICE_USER.getMessage(), UNMACHED_VOICE_USER.getCode()));
        } catch (Exception e) {
            throw new BaseException(
                    new ApiError(FAIL_UPDATE_VOICE.getMessage(), FAIL_UPDATE_VOICE.getCode()));
        }
    }

    @Transactional
    public void deleteVoice(HttpServletRequest request, Long voiceId) {
        User user = userService.getUser(request);
        Voice voice = getVoice(voiceId);
        if (voice.getUser() == user) {
            voice.delete();
            return;
        }
        throw new BaseException(
                new ApiError(UNMACHED_VOICE_USER.getMessage(), UNMACHED_VOICE_USER.getCode()));
    }

    public Voice getVoice(Long voiceId) {
        return voiceRepository.findById(voiceId).orElseThrow(() -> new BaseException(
                new ApiError(NOT_EXSIT_VOICE.getMessage(), NOT_EXSIT_VOICE.getCode())));
    }
}
