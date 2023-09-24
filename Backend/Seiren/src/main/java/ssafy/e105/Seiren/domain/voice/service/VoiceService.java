package ssafy.e105.Seiren.domain.voice.service;

import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.EXIST_PROCESSING_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.FAIL_CREATE_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.FAIL_UPDATE_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXIST_PROCESSING_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXIST_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXSIT_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.UNMACHED_VOICE_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.domain.voice.dto.VoiceDto;
import ssafy.e105.Seiren.domain.voice.dto.VoiceMemoUpdateRequest;
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

    public VoiceDto getCurrentVoiceId(HttpServletRequest request) {
        List<Voice> list = voiceRepository.findByUser_IdAndStateLessThanOrderByCreatedAtDesc(
                userService.getUser(request).getId(), 3);
        if (list.size() == 0) {
            throw new BaseException(new ApiError(NOT_EXIST_PROCESSING_VOICE.getMessage(),
                    NOT_EXIST_PROCESSING_VOICE.getCode()));
        }
        return new VoiceDto(list.get(0));
    }

    public List<VoiceDto> getVoiceList(HttpServletRequest request) {
        List<Voice> voiceList = voiceRepository.findByUser_Id(userService.getUser(request).getId());
//        return voiceList.stream()
//                .map(voice -> {
//                    Integer state = Optional.ofNullable(voice.getProduct())
//                            .map(product -> product.getState() ? 1 : 2)
//                            .orElse(0); //0:등록X, 1:등록&판매, 2:등록&판매중지
//                    return new VoiceDto(voice.getVoiceId(), voice.getVoiceTitle(),
//                            voice.getVoiceAvatarUrl(),
//                            voice.getCreatedAt(), state);
//                })
//                .collect(Collectors.toList()); // voice table에 state column을 넣기 이전의 코드
        return voiceList.stream()
                .map(voice -> new VoiceDto(voice.getVoiceId(), voice.getVoiceTitle(),
                        voice.getVoiceAvatarUrl(),
                        voice.getCreatedAt(), voice.getState()))
                .collect(Collectors.toList());  // voice table에 state column을 넣은 이후의 코드
    }

    public VoiceUpdateDto getVoiceDetail(HttpServletRequest request, Long voiceId) {
        Voice voice = voiceRepository.findOneByUser_IdAndVoiceId(
                userService.getUser(request).getId(),
                voiceId).orElseThrow(() -> new BaseException(new ApiError(
                NOT_EXIST_VOICE.getMessage(), NOT_EXIST_VOICE.getCode())));
        return new VoiceUpdateDto(voice);
    }

    @Transactional
    public Long addVoice(HttpServletRequest request) {
        User user = userService.getUser(request);
        try {
            if (voiceRepository.findByUser_IdAndStateLessThan(user.getId(), 2).isEmpty()) {
                Voice voice = Voice.toEntity(user);
                return voiceRepository.save(voice).getVoiceId();
            }
            throw new BaseException(new ApiError(EXIST_PROCESSING_VOICE.getMessage(),
                    EXIST_PROCESSING_VOICE.getCode()));
        } catch (BaseException e) {
            throw new BaseException(e.getApiError());
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
                return;
            }
            // voice 보유 유저 id와 업데이트 요청을 한 유저 id가 일치하지 않을 시 에러 처리
            throw new BaseException(
                    new ApiError(UNMACHED_VOICE_USER.getMessage(), UNMACHED_VOICE_USER.getCode()));
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(
                    new ApiError(FAIL_UPDATE_VOICE.getMessage(), FAIL_UPDATE_VOICE.getCode()));
        }
    }

    @Transactional
    public void updateVoiceMemo(HttpServletRequest request,
            VoiceMemoUpdateRequest voiceMemoUpdateRequest) {
        User user = userService.getUser(request);
        Voice voice = getVoice(voiceMemoUpdateRequest.getVoiceId());
        try {
            if (voice.getUser() == user) {
                voice.update(voiceMemoUpdateRequest.getMemo());
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
