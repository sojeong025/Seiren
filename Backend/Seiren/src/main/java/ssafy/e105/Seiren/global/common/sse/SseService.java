package ssafy.e105.Seiren.global.common.sse;


import jakarta.servlet.http.HttpServletRequest;
import java.io.IOException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import ssafy.e105.Seiren.domain.user.service.UserService;

@Service
@RequiredArgsConstructor
public class SseService {

    private final EmitterRepository emitterRepository;
    //    private final NotifyRepository notifyRepository;
    private final UserService userService;

    // subscribe 연결 설정
    public SseEmitter subscribe(HttpServletRequest request, SseEmitter sseEmitter) {
        Long userId = userService.getUser(request).getId();

        sseEmitter = emitterRepository.save(userId, sseEmitter);
        sseEmitter.onCompletion(() -> {
            emitterRepository.deleteById(userId);
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

//    // 이벤트 전송 메소드
//    @Transactional
//    public void send(User user, NotificationType type, String content) {
//        Notify notify = new Notify(content, type, user);
//        Long userId = user.getId();
//
//        Optional<SseEmitter> optionalEmitter = emitterRepository.findByUserId(userId);
//
//        // 연결되어 있지 않은 경우
//        if (optionalEmitter.isEmpty()) {
//            notify.setIsRead(false);
//            notifyRepository.save(notify);
//            return;
//        }
//
//        SseEmitter emitter = optionalEmitter.get();
//
//        try {
//            emitter.send(SseEmitter.event()
//                    .name(String.valueOf(type))
//                    .data(content));
//            notify.setIsRead(true);
//
//        } catch (IOException e) {
//            emitterRepository.deleteById(userId);
//            notify.setIsRead(false);
//        }
//
//        notifyRepository.save(notify);
//    }
}
