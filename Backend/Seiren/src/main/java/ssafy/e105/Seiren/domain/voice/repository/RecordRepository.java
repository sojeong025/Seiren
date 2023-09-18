package ssafy.e105.Seiren.domain.voice.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.voice.entity.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {

    Optional<Record> findTopByVoice_User_IdOrderByScript_IdDesc(Long userId);
}
