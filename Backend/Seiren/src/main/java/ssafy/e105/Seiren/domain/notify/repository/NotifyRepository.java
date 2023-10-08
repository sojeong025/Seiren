package ssafy.e105.Seiren.domain.notify.repository;

import java.time.LocalDateTime;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.notify.entity.Notify;
import ssafy.e105.Seiren.domain.user.entity.User;

public interface NotifyRepository extends JpaRepository<Notify, Long> {

    List<Notify> findByUserAndCreatedAtAfter(User user, LocalDateTime dateTime);

    Integer CountByUserAndIsReadFalse(User user);
}
