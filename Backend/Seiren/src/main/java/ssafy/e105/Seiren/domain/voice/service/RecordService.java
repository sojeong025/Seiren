package ssafy.e105.Seiren.domain.voice.service;

import static ssafy.e105.Seiren.domain.voice.exception.VoiceErrorCode.WRONG_USER;

import jakarta.servlet.http.HttpServletRequest;
import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import javax.sound.sampled.AudioFileFormat;
import javax.sound.sampled.AudioFormat;
import javax.sound.sampled.AudioInputStream;
import javax.sound.sampled.AudioSystem;
import javax.sound.sampled.UnsupportedAudioFileException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.domain.voice.dto.RecordResponse;
import ssafy.e105.Seiren.domain.voice.entity.Record;
import ssafy.e105.Seiren.domain.voice.entity.Voice;
import ssafy.e105.Seiren.domain.voice.repository.RecordRepository;
import ssafy.e105.Seiren.domain.voice.repository.ScriptRepository;
import ssafy.e105.Seiren.domain.voice.repository.VoiceRepository;
import ssafy.e105.Seiren.global.config.S3Service;
import ssafy.e105.Seiren.global.error.type.BaseException;
import ssafy.e105.Seiren.global.utils.ApiError;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class RecordService {

    private final RecordRepository recordRepository;
    private final ScriptRepository scriptRepository;
    private final VoiceRepository voiceRepository;
    private final ScriptService scriptService;
    private final UserService userService;
    private final S3Service s3Service;


    public Long getRecentScriptId(HttpServletRequest request, Long voiceId) {
        Optional<Record> record = recordRepository.findTopByVoiceUserIdAndVoiceVoiceIdOrderByScriptScriptIdDesc(
                userService.getUser(request).getId(), voiceId);

        return record.map(r -> r.getScript().getScriptId()).orElse(0L);
    }

    public Long getRecentScriptId(Long userId, Long voiceId) {
        Optional<Record> record = recordRepository.findTopByVoiceUserIdAndVoiceVoiceIdOrderByScriptScriptIdDesc(
                userId, voiceId);

        return record.map(r -> r.getScript().getScriptId()).orElse(0L);
    }

    public RecordResponse getRecordsCount(HttpServletRequest request, Long voiceId) {
        Long userId = userService.getUser(request).getId();
        Integer recordCount = recordRepository.countByVoice_User_IdAndVoice_VoiceId(userId,
                voiceId); // 내 녹음 횟수
        Long scriptId = getRecentScriptId(userId, voiceId);
        Integer totalCount =
                scriptRepository.countByScriptIdGreaterThanAndIsDeleteFalse(scriptId)
                        + recordCount;
        return new RecordResponse(recordCount, totalCount);
    }

    @Transactional
    public void insertRecord(HttpServletRequest request, Long voiceId, Long scriptId,
            MultipartFile file) {
        // voice 객체 존재하는지 확인 & 가져오기
        Voice voice = voiceRepository.findOneByUser_IdAndVoiceId(
                userService.getUser(request).getId(), voiceId).orElseThrow(
                () -> new BaseException(
                        new ApiError(WRONG_USER.getMessage(), WRONG_USER.getCode())));

        try {
            // 파일 형식 변환
            File tempFile = File.createTempFile("audio", "tmp");
            file.transferTo(tempFile);
            File outputWav = File.createTempFile(String.valueOf(voiceId) + "-" + scriptId,
                    ".wav");
            convertToWavWithSampleRate(tempFile, outputWav, 22050.0f);

            // s3 저장
            String url = s3Service.uploadRecordFile(outputWav);

            // db 저장
            recordRepository.save(Record.toEntity(voice, scriptService.getScript(scriptId), url));
        } catch (Exception e) {
            e.printStackTrace();
            throw new BaseException(new ApiError("record 저장 에러", 0));
        }
    }

    public List<Record> getRecordList(Long voiceId) {
        return recordRepository.findAllByVoice_VoiceId(voiceId);
    }

    // 수동 입력을 위한 메서드
    @Transactional
    public void insertRecordTest(HttpServletRequest request, Long voiceId, Long scriptId,
            String recordUrl) {
        if (recordRepository.findByVoice_VoiceIdAndScript_ScriptId(voiceId, scriptId).isPresent()) {
            throw new BaseException(new ApiError("해당 scriptId의 녹음파일은 이미 저장되어있습니다.", 0));
        }
        Voice voice = voiceRepository.findOneByUser_IdAndVoiceId(
                        userService.getUser(request).getId(), voiceId)
                .orElseThrow(() -> new BaseException(new ApiError("record insert error", 0)));
        recordRepository.save(Record.toEntity(voice, scriptService.getScript(scriptId), recordUrl));
    }

    public void convertToWavWithSampleRate(File sourceAudio, File targetAudio,
            float newSampleRate)
            throws UnsupportedAudioFileException, IOException {
        AudioInputStream audioInputStream = AudioSystem.getAudioInputStream(sourceAudio);
        AudioFormat originalFormat = audioInputStream.getFormat();

        if (originalFormat.getSampleRate() != newSampleRate) {
            // Create a new audio format with the desired sample rate
            AudioFormat newFormat = new AudioFormat(originalFormat.getEncoding(),
                    newSampleRate,
                    originalFormat.getSampleSizeInBits(),
                    originalFormat.getChannels(),
                    originalFormat.getFrameSize(),
                    newSampleRate,
                    originalFormat.isBigEndian());

            // Get a stream with the desired format
            audioInputStream = AudioSystem.getAudioInputStream(newFormat, audioInputStream);
        }

        // Write to the target .wav file
        if (AudioSystem.isFileTypeSupported(AudioFileFormat.Type.WAVE, audioInputStream)) {
            int nWrittenBytes = AudioSystem.write(audioInputStream,
                    AudioFileFormat.Type.WAVE,
                    targetAudio);
        } else {
            throw new BaseException(new ApiError("Conversion to .wav is not supported.", 0));
        }
    }
}
