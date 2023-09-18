package ssafy.e105.Seiren.domain.voice.service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import ssafy.e105.Seiren.domain.user.service.UserService;
import ssafy.e105.Seiren.domain.voice.entity.Record;
import ssafy.e105.Seiren.domain.voice.repository.RecordRepository;

@Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final UserService userService;

    public Long getRecentRecordId(HttpServletRequest request) {
        Optional<Record> record = recordRepository.findTopByVoice_User_IdOrderByScript_IdDesc(
                userService.getUser(request).getId());
        return record.map(Record::getRecordId).orElse(-1L);
    }
}
