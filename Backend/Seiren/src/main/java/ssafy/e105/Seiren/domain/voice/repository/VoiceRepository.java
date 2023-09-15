package ssafy.e105.Seiren.domain.voice.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.voice.dto.VoiceDto;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

public interface VoiceRepository extends JpaRepository<Voice, Long> {

    @Query("select v from Voice v left join fetch Product")
        // where v.userId = :userIdd
    List<VoiceDto> findVoiceJoin(@Param("userId") Long userId);
}
