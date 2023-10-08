package ssafy.e105.Seiren.domain.notify.service;

import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import ssafy.e105.Seiren.domain.notify.dto.NotifyResponse;
import ssafy.e105.Seiren.domain.notify.entity.Notify;
import ssafy.e105.Seiren.domain.notify.repository.NotifyRepository;
import ssafy.e105.Seiren.domain.user.service.UserService;

@Service
@RequiredArgsConstructor
public class NotifyService {

    private final NotifyRepository notifyRepository;
    private final UserService userService;

    @Transactional
    public List<NotifyResponse> getNotifyList(HttpServletRequest request) {
        List<Notify> notifyList = notifyRepository.findByUser(userService.getUser(request));
        List<NotifyResponse> notifyResponseList = notifyList.stream()
                .map(notify -> new NotifyResponse(notify))
                .collect(Collectors.toList());
        for (Notify notify : notifyList) {
            notify.update();
        }
        return notifyResponseList;
    }
}
