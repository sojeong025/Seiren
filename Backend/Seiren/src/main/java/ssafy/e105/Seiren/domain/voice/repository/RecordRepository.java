package ssafy.e105.Seiren.domain.voice.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.voice.entity.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {

    Optional<Record> findTopByVoiceUserIdAndVoiceVoiceIdOrderByScriptScriptIdDesc(Long userId,
            Long voiceId);


    Integer countByVoice_User_IdAndVoice_VoiceId(Long userId, Long voiceId);

    List<Record> findAllByVoice_VoiceId(Long voiceId);

    Optional<Record> findByVoice_VoiceIdAndScript_ScriptId(Long voiceId, Long scriptId);
}
