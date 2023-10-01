package ssafy.e105.Seiren.domain.voice.repository;

import java.util.List;
import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.voice.entity.Voice;

public interface VoiceRepository extends JpaRepository<Voice, Long> {

    //    @Query("select v from Voice v left join fetch v.product") state column을 voice table에 넣기 이전에 사용한 코드
    List<Voice> findByUser_IdAndIsDeleteFalse(Long userId);

    @Query("SELECT v FROM Voice v WHERE v.user.id = :userId AND v.state = 0")
    List<Voice> findByUser_IdAndStateIsZero(@Param("userId") Long userId);

    List<Voice> findByUser_IdAndStateLessThan(Long userId, int state);

    Optional<Voice> findOneByUser_IdAndVoiceId(Long userId, Long voiceId);

    List<Voice> findByUser_IdAndStateLessThanOrderByCreatedAtDesc(Long userId, int state);

    List<Voice> findByUserIdAndStateGreaterThanEqual(Long userId, int state);

    @Query("SELECT v FROM Voice v WHERE v.user.id = :userId")
    List<Voice> findByUserId(@Param("userId") Long userId);
}
