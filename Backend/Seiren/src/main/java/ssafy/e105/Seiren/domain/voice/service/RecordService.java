package ssafy.e105.Seiren.domain.voice.service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.domain.voice.dto.RecordResponse;
import ssafy.e105.Seiren.domain.voice.entity.Record;
import ssafy.e105.Seiren.domain.voice.repository.RecordRepository;
import ssafy.e105.Seiren.domain.voice.repository.ScriptRepository;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final ScriptRepository scriptRepository;
    private final UserService userService;

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
        Integer recordCount = recordRepository.findCountByVoice_User_IdAndVoice_VoiceId(userId,
                voiceId); // 내 녹음 횟수
        Long scriptId = getRecentScriptId(userId, voiceId);
        Integer totalCount =
                scriptRepository.findCountByScriptIdGreaterThanAndIsDeleteFalse(scriptId)
                        + recordCount;
        return new RecordResponse(recordCount, totalCount);
    }


}
