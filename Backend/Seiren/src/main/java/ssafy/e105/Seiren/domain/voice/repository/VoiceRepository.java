package ssafy.e105.Seiren.domain.voice.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

public interface VoiceRepository extends JpaRepository<Voice, Long> {

    @Query("select v from Voice v left join fetch v.product")
    List<Voice> findByUser_Id(Long userId);
}
