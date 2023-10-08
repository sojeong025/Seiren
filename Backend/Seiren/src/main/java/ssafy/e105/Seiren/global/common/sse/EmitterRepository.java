package ssafy.e105.Seiren.global.common.sse;

import java.util.Map;
import java.util.Optional;
import java.util.concurrent.ConcurrentHashMap;
import org.springframework.stereotype.Repository;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@Repository
public class EmitterRepository {

    public final Map<Long, SseEmitter> emitters = new ConcurrentHashMap<>();

    // emitter 저장
    public SseEmitter save(Long userId, SseEmitter sseEmitter) {
        emitters.put(userId, sseEmitter);
        return sseEmitter;
    }

    // 한 유저의 sseEmitter 찾기
    public Optional<SseEmitter> findByUserId(Long userId) {
        return Optional.ofNullable(emitters.get(userId));
    }

    // 한 유저의 sseEmitter 삭제
    public void deleteById(Long userId) {
        emitters.remove(userId);
    }

}
