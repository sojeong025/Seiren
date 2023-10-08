package ssafy.e105.Seiren.domain.notify.repository;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import ssafy.e105.Seiren.domain.notify.entity.Notify;

public interface NotifyRepository extends JpaRepository<Notify, Long> {

    @Query(value = "SELECT n FROM Notify n WHERE n.user.id = :userId AND n.createdAt > (NOW() - INTERVAL 1 WEEK)", nativeQuery = true)
    List<Notify> findByUserIdAndCreatedAtAfter(@Param("userId") Long userId);

}
