package ssafy.e105.Seiren.domain.voice.service;

import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.EXIST_PROCESSING_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.FAIL_CREATE_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.FAIL_UPDATE_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXIST_PROCESSING_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXIST_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.NOT_EXSIT_VOICE;
import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.UNMACHED_VOICE_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.io.ByteArrayOutputStream;
import java.net.URI;
import java.util.List;
import java.util.stream.Collectors;
import java.util.zip.ZipEntry;
import java.util.zip.ZipOutputStream;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.domain.voice.dto.VoiceDto;
import ssafy.e105.Seiren.domain.voice.dto.VoiceInsertUpdateDto;
import ssafy.e105.Seiren.domain.voice.dto.VoiceMemoUpdateRequest;
import ssafy.e105.Seiren.domain.voice.entity.Record;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.global.config.S3Service;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class VoiceService {

    private final VoiceRepository voiceRepository;
    private final UserService userService;
    private final S3Service s3Service;
    private final RecordService recordService;
    private final ScriptService scriptService;

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

    public VoiceInsertUpdateDto getVoiceDetail(HttpServletRequest request, Long voiceId) {
        Voice voice = voiceRepository.findOneByUser_IdAndVoiceId(
                userService.getUser(request).getId(),
                voiceId).orElseThrow(() -> new BaseException(new ApiError(
                NOT_EXIST_VOICE.getMessage(), NOT_EXIST_VOICE.getCode())));
        return new VoiceInsertUpdateDto(voice);
    }

    @Transactional
    public Long addVoice(HttpServletRequest request, VoiceInsertUpdateDto voiceDto) {
        User user = userService.getUser(request);
        try {
            if (voiceRepository.findByUser_IdAndStateLessThan(user.getId(), 2).isEmpty()) {
                Voice voice = Voice.toEntity(user, voiceDto);
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
    public void updateVoice(HttpServletRequest request, VoiceInsertUpdateDto voiceInsertUpdateDto) {
        User user = userService.getUser(request);
        Voice voice = getVoice(voiceInsertUpdateDto.getVoiceId());
        try {
            if (voice.getUser() == user) {
                voice.update(voiceInsertUpdateDto);
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

    public String getZipUrl(HttpServletRequest request, Long voiceId) {
        User user = userService.getUser(request);
        Voice voice = getVoice(voiceId);
        if (voice.getUser() == user) {
            return s3Service.uploadZipFile(createZipFile(voiceId), String.valueOf(voiceId));
        }
        throw new BaseException(
                new ApiError(UNMACHED_VOICE_USER.getMessage(), UNMACHED_VOICE_USER.getCode()));
    }

    // zip file 생성
    public ByteArrayOutputStream createZipFile(Long voiceId) {
        List<Record> recordList = recordService.getRecordList(voiceId);
        try {
            ByteArrayOutputStream byteArrayOutputStream = new ByteArrayOutputStream();
            ZipOutputStream zipOut = new ZipOutputStream(byteArrayOutputStream);

            // text 파일 추가
            addToZip(zipOut, "output.txt", createScriptsText(voiceId, recordList).getBytes());

            // wav 음성 파일 추가
            int i = 0;
            for (Record record : recordList) {
                String key = (new URI(record.getRecordUrl())).getPath().substring(1);
                System.out.println(key);
                addToZip(zipOut, String.valueOf(i++) + ".wav", s3Service.downloadWavFile(key));
            }
            zipOut.close();
            return byteArrayOutputStream;

        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError("zip 파일 생성 실패", 0));
        }
    }

    // 스크립트들을 모아 양식에 맞게 하나의 문자열로 생성
    public String createScriptsText(Long voiceId, List<Record> recordList) {
        StringBuilder sb = new StringBuilder();
        int i = 0;
        for (Record record : recordList) {
            sb.append("data123/")
                    .append(voiceId)
                    .append("/wavs/")
                    .append(i++)
                    .append(".wav|")
                    .append(scriptService.getScriptText(record.getScript().getScriptId()))
                    .append("\n");
        }
        return sb.toString();
    }

    // zip 파일에 byte 데이터(파일) 추가
    private void addToZip(ZipOutputStream zipOut, String fileName, byte[] content) {
        try {
            ZipEntry zipEntry = new ZipEntry(fileName);
            zipOut.putNextEntry(zipEntry);
            zipOut.write(content);
            zipOut.closeEntry();
        } catch (Exception e) {
            throw new BaseException(new ApiError("zip 파일에 파일 추가 실패", 0));
        }
    }


}
