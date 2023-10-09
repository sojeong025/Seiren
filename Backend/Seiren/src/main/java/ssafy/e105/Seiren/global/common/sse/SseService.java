package ssafy.e105.Seiren.global.common.sse;


import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.util.Optional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import ssafy.e105.Seiren.domain.notify.entity.Notify;
import ssafy.e105.Seiren.domain.notify.repository.NotifyRepository;
import ssafy.e105.Seiren.domain.user.entity.User;
import ssafy.e105.Seiren.domain.user.service.UserService;

@Service
@RequiredArgsConstructor
public class SseService {

    private final EmitterRepository emitterRepository;
    private final NotifyRepository notifyRepository;
    private final UserService userService;

    // subscribe 연결 설정
    public SseEmitter subscribe(Long userId, SseEmitter sseEmitter) {
        sseEmitter = emitterRepository.save(userId, sseEmitter);
        sseEmitter.onCompletion(() -> {
            emitterRepository.deleteById(userId);
            System.out.println("연결 종료");
        });
        sseEmitter.onTimeout(sseEmitter::complete);

        // 503 에러를 방지하기 위한 더미 이벤트 전송
        sendConnect(sseEmitter, userId);

        return sseEmitter;
    }

    // sendMethod
    private void sendConnect(SseEmitter emitter, Long userId) {
        try {
            emitter.send(SseEmitter.event()
                    .name("CONNECT")
                    .data("connect OK"));
            System.out.println("연결 성공");
        } catch (IOException e) {
            System.out.println("연결 실패");
            emitterRepository.deleteById(userId);
        }
    }

    // 연결 종료
    public void disConnect(HttpServletRequest request) {
        emitterRepository.deleteById(userService.getUser(request).getId());
    }

    @Transactional
    public void send(User user, NotificationType type, String content) {
        Notify notify = new Notify(content, type, user);
        Long userId = user.getId();

        Optional<SseEmitter> optionalEmitter = emitterRepository.findByUserId(userId);

        // 연결되어 있지 않은 경우
        if (optionalEmitter.isEmpty()) {
            notifyRepository.save(notify);
            return;
        }

        // 연결되어 있는 경우
        SseEmitter emitter = optionalEmitter.get();

        try {
            emitter.send(SseEmitter.event()
                    .name(String.valueOf(type))
                    .data(content));
//            notify.update(); // front에서 다른 방식으로 구현해서 일단 주석처리

        } catch (IOException e) {
            emitterRepository.deleteById(userId);
        }

        notifyRepository.save(notify);
    }

    @Transactional
    public void sendTest(HttpServletRequest request, NotificationType type, String content) {
        User user = userService.getUser(request);
        Notify notify = new Notify(content, type, user);
        Long userId = user.getId();

        Optional<SseEmitter> optionalEmitter = emitterRepository.findByUserId(userId);

        // 연결되어 있지 않은 경우
        if (optionalEmitter.isEmpty()) {
            notifyRepository.save(notify);
            return;
        }

        // 연결되어 있는 경우
        SseEmitter emitter = optionalEmitter.get();

        try {
            emitter.send(SseEmitter.event()
                    .name(String.valueOf(type))
                    .data(content));
            notify.update();

        } catch (IOException e) {
            emitterRepository.deleteById(userId);
        }

        notifyRepository.save(notify);
    }
}
