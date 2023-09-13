package ssafy.e105.Seiren.domain.voice.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.voice.entity.Record;

public interface RecordRepository extends JpaRepository<Record, Long> {

}
