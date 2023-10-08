package ssafy.e105.Seiren.global.common.sse;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

@RestController
@RequiredArgsConstructor
public class SseController {

    private static final long TIMEOUT = 60 * 60 * 1000L; // 1시간
    private final SseService sseService;

    @GetMapping(value = "/api/sse/connect", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter connect(HttpServletRequest request, HttpServletResponse response) {
        response.addHeader("X-Accel-Buffering", "no"); // nginx 관련 설정

        SseEmitter sseEmitter = new SseEmitter(TIMEOUT);
        sseEmitter = sseService.subscribe(request, sseEmitter);
        return sseEmitter;
    }

    @DeleteMapping("/api/sse/disconnect")
    public void disconnect(HttpServletRequest request) {
        sseService.disConnect(request);
    }

}
