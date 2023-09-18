package ssafy.e105.Seiren.domain.voice.repository;

import java.util.Optional;
import org.springframework.data.jpa.repository.JpaRepository;
import ssafy.e105.Seiren.domain.voice.entity.Script;

public interface ScriptRepository extends JpaRepository<Script, Long> {

    Optional<Script> findTopByScriptIdGreaterThanAndIsDeleteFalseOrderByScript_IdAsc(Long scripId);
}
